import { Component, Input, OnInit } from '@angular/core';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {

  @Input() playlist: PlaylistDto;

  public dataSource: Array<SongDto>;
  public displayedColumns: string[] = ['position', 'title', 'artist', 'genre', 'addedOn', 'likes', 'playbacks'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.playlist.songs;
  }

}
