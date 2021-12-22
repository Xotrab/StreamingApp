import { Component, Input, OnInit } from '@angular/core';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { Genre } from 'src/app/helpers/genre.enum';
import { EnumToArrayPipe } from '../pipes/enum-to-array.pipe';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {

  @Input() playlist: PlaylistDto;

  public dataSource: Array<SongDto>;
  public displayedColumns: string[] = ['position', 'title', 'artist', 'genre', 'addedOn', 'likes', 'playbacks'];

  public genres = Genre;
  public genreNames: Array<string>;

  public currentSongId: number = null;
  public isPlaying: boolean = false;

  constructor(private enumToArrayPipe: EnumToArrayPipe) { }

  public ngOnInit(): void {
    this.dataSource = this.playlist.songs;
    this.genreNames = this.enumToArrayPipe.transform(this.genres);
  }

  public play(id: number): void {
    this.currentSongId = id;
    this.isPlaying = true;
  }

  public pause(): void {
    this.isPlaying = false;
  }

}