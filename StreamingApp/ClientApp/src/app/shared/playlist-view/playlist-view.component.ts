import { Component, Input, OnInit } from '@angular/core';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  @Input() playlist: PlaylistDto;

  public searchFilter: string;

  public pluralMap = {
    '=0': '0 songs',
    '=1': '1 song',
    'other': '# songs'
  };

  constructor() { }

  ngOnInit(): void {
  }

  public clearInput(): void {
    this.searchFilter = null;
  }

}
