import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  public isLiked: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public tooglePlaylistLike(): void {
    this.isLiked = !this.isLiked;
  }
}
