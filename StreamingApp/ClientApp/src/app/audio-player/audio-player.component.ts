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
    var style = document.createElement( 'style' );
    style.innerHTML = 'div { background-color: #F5F5F5; padding-bottom: 10rem !important;}';
    document.getElementById('vmPlayer').shadowRoot.appendChild(style);
  }

  public tooglePlaylistLike(): void {
    this.isLiked = !this.isLiked;
  }
}
