import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { Genre } from 'src/app/helpers/genre.enum';
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

  public dataSource: Array<SongDto>;
  public displayedColumns: string[] = ['position', 'title', 'artist', 'genre', 'addedOn', 'likes', 'playbacks'];

  public genres = Genre;
  public genreNames: Array<string>;

  public currentSongId: number = null;
  public isPlaying: boolean = false;

  constructor(private enumToArrayPipe: EnumToArrayPipe, private audioPlayerService: AudioPlayerService) { }
  
  public ngOnInit(): void {
    this.dataSource = this.songs;
    this.genreNames = this.enumToArrayPipe.transform(this.genres);

    this.audioPlayerService.isPlaying$.subscribe(result => this.isPlaying = result);
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
    //this.isPlaying = false;
    this.audioPlayerService.togglePlay(false);
  }

}
