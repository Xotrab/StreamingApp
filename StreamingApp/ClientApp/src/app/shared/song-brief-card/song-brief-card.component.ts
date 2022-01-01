import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { MenuPosition } from 'src/app/helpers/menu-position';
import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-brief-card',
  templateUrl: './song-brief-card.component.html',
  styleUrls: ['./song-brief-card.component.scss']
})
export class SongBriefCardComponent implements OnInit {

  @Input() song: SongDto;
  @Input() showMenu: boolean = false;
  @Input() playlistId: number;

  @Output() addedSong = new EventEmitter<SongDto>();

  public isLoggedIn$: Observable<boolean>;

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  public menuPosition: MenuPosition = {
    x:'0',
    y:'0'
  };

  constructor(
    private jwtTokenService: JwtTokenService,
    private dialog: MatDialog,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar,
    private audioPlayerService: AudioPlayerService
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public onRightClick(event: MouseEvent): void {
    if (!this.showMenu) {
      return;
    }
    event.preventDefault(); 

    this.menuPosition.x = event.clientX + 'px'; 
    this.menuPosition.y = event.clientY + 'px'; 

    this.matMenuTrigger.openMenu(); 
  } 

  public likeSong(): void {

  }

  public dislikeSong(): void {

  }

  public addSongToPlaylist(): void {
    this.playlistService.addSong(this.playlistId, this.song.id).subscribe(result => {
      this.showMenu = false;
      this.addedSong.emit(this.song);
      this.snackBar.open(
        "Successfully added the song to the playlist", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
    });
  }
}
