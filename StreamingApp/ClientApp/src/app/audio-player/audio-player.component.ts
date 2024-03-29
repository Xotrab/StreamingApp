import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Player } from '@vime/angular';
import { SongDto } from '../api/dtos/song-dto';
import { SongService } from '../api/services/song.service';
import { AudioPlayerService } from '../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {

  public song: SongDto;

  public isPlaying: boolean = false;

  public harambe: boolean = true;

  public loopActive: boolean = false;

  public likedSongs: Array<SongDto>;

  constructor(private audioPlayerService: AudioPlayerService, private songService: SongService) { }

  @ViewChildren(Player) playerList: QueryList<Player>;

  @ViewChild(Player) player: Player;

  ngAfterViewInit() {
    this.playerList.changes.subscribe(() => {
      const player = this.playerList.first;
      if(!!player) {
        var style = document.createElement( 'style' );
        style.innerHTML = 'div { background-color: #F5F5F5; padding-bottom: 10rem !important;}';
        document.getElementById('vmPlayer').shadowRoot.appendChild(style);
      }
    })  
  } 
  
  public ngOnInit(): void {
    this.audioPlayerService.currentSong$.subscribe(result => {
      this.song = result;
      this.harambe = false;
      setTimeout(()=> {this.harambe = true;}, 1);
    });
    this.audioPlayerService.isPlaying$.subscribe(result => {
      this.isPlaying = result;
      if (this.player) {
        this.player.paused = !this.isPlaying;
      }
    });
  }

  public togglePlaylistLike(): void {
    if (!this.song.likedByUser) {
      this.songService.likeSong(this.song.id).subscribe(result => {
        this.song.likedByUser = true;
        this.song.likes +=1;
      });
    }
    else {
      this.songService.dislikeSong(this.song.id).subscribe(result => {
        this.song.likedByUser = false;
        this.song.likes -=1;
      })
    }
  }

  public toggleLoop(): void {
    this.loopActive = !this.loopActive;
  }

  public autoNext(): void {
    if (!this.loopActive) {
      this.next();
    }
  }

  public previous(): void {
    this.audioPlayerService.previous();
  }

  public togglePlay(): void {
    this.audioPlayerService.togglePlay(!this.isPlaying);
  }

  public next(): void {
    this.audioPlayerService.next();
  }
}
