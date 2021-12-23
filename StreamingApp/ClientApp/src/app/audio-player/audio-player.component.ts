import { Component, OnInit } from '@angular/core';
import { SongDto } from '../api/dtos/song-dto';
import { AudioPlayerService } from '../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  public song: SongDto;

  public isLiked: boolean = false;

  constructor(private audioPlayerService: AudioPlayerService) { }

  public ngOnInit(): void {
    var style = document.createElement( 'style' );
    style.innerHTML = 'div { background-color: #F5F5F5; padding-bottom: 10rem !important;}';
    document.getElementById('vmPlayer').shadowRoot.appendChild(style);
  }

  public togglePlaylistLike(): void {
    this.isLiked = !this.isLiked;
  }

  public toggleLoop(): void {

  }

  public previous(): void {

  }

  public togglePlay(): void {
    
  }

  public next(): void {

  }
}
