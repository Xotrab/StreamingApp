import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { SongService } from 'src/app/api/services/song.service';
import { Genre } from 'src/app/helpers/genre.enum';
import { MenuPosition } from 'src/app/helpers/menu-position';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { EnumToArrayPipe } from '../pipes/enum-to-array.pipe';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit, OnChanges {

  @Input() songs: Array<SongDto>;
  @Input() playlistId: number;
  @Input() showMenu: boolean;

  @Output() songRemoved = new EventEmitter<number>();

  public dataSource: Array<SongDto>;
  public displayedColumns: string[] = ['position', 'title', 'artist', 'genre', 'addedOn', 'likes', 'playbacks'];

  public genres = Genre;
  public genreNames: Array<string>;

  public currentSongId: number = null;
  public isPlaying: boolean = false;
  public playlistInThePlayer: boolean = false;

  public menuPosition: MenuPosition = {
    x:'0',
    y:'0'
  };

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  constructor(
    private enumToArrayPipe: EnumToArrayPipe,
    private audioPlayerService: AudioPlayerService,
    private songService: SongService,
    private playlistService: PlaylistService
  ) { }
  
  public ngOnInit(): void {
    this.dataSource = this.songs;
    this.genreNames = this.enumToArrayPipe.transform(this.genres);

    this.audioPlayerService.isPlaying$.subscribe(result => this.isPlaying = result);
    this.audioPlayerService.songId$.subscribe(result => this.currentSongId = result);
    this.audioPlayerService.playlistId$.subscribe(result => this.playlistInThePlayer = this.playlistId === result);
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.songs.currentValue !==  changes.songs.previousValue) {
      this.dataSource = this.songs;
    }
  }
  
  public play(id: number): void {
    this.currentSongId = id;
    this.isPlaying = true;

    const playlistDto = {
      id: this.playlistId,
      songs: this.songs
    } as PlaylistDto;

    this.audioPlayerService.playPlaylist(playlistDto, this.currentSongId);
  }

  public pause(): void {
    this.audioPlayerService.togglePlay(false);
  }

  public onRightClick(event: MouseEvent, songPosition: number): void {
    if (!this.showMenu) {
      return;
    }
    event.preventDefault(); 

    this.menuPosition.x = event.clientX + 'px'; 
    this.menuPosition.y = event.clientY + 'px';

    this.matMenuTrigger.menuData = {songPosition: songPosition} 
    this.matMenuTrigger.openMenu(); 

  }

  public removeSong(songPosition: number): void {
    const songId = this.songs[songPosition].id;

    switch(this.playlistId) {
      //liked songs
      case -1:
        this.songService.dislikeSong(songId).subscribe(result => {
          this.songRemoved.emit(songId);
        });
        break;
      //uploaded
      case 0:
        console.log("uploaded");
        break;
      //normal playlist
      default:
        this.playlistService.removeSong(this.playlistId, songId).subscribe(result => {
          this.songRemoved.emit(songId);
        });
        break;
    }
  }
}
