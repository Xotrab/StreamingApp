import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
import { MenuPosition } from 'src/app/helpers/menu-position';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { environment } from 'src/environments/environment';
import { RemovePlaylistDialogComponent } from '../remove-playlist-dialog/remove-playlist-dialog.component';

@Component({
  selector: 'app-playlist-brief-card',
  templateUrl: './playlist-brief-card.component.html',
  styleUrls: ['./playlist-brief-card.component.scss']
})
export class PlaylistBriefCardComponent implements OnInit {

  @Input() playlistBrief: PlaylistBriefDto;
  @Input() showMenu: boolean = false;

  @Output() playlistRemoved = new EventEmitter<number>();

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
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public dislikePlaylist(): void {
    this.playlistService.dislikePlaylist(this.playlistBrief.id).subscribe(result => {
      this.playlistBrief.likedByUser = false;
      this.playlistRemoved.emit(this.playlistBrief.id);

      this.snackBar.open(
        "Playlist " + this.playlistBrief.name + " has been removed from liked", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
    });
  }

  public likePlaylist(): void {
    this.playlistService.likePlaylist(this.playlistBrief.id).subscribe(result => {
      this.playlistBrief.likedByUser = true;

      this.snackBar.open(
        "Playlist " + this.playlistBrief.name + " has been added to liked", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
    });
  }

  public onRightClick(event: MouseEvent): void {
    if (!this.showMenu) {
      return;
    }
    event.preventDefault(); 

    this.menuPosition.x = event.clientX + 'px'; 
    this.menuPosition.y = event.clientY + 'px'; 

    this.matMenuTrigger.menuData = { playlistBrief: this.playlistBrief };

    this.matMenuTrigger.openMenu(); 
  } 

  public openRemovePlaylistDialog(): void {
    const dialogRef = this.dialog.open(RemovePlaylistDialogComponent, { disableClose: true, autoFocus: false, scrollStrategy: new NoopScrollStrategy(), data: this.playlistBrief });

    dialogRef.afterClosed().subscribe(result =>{
      if (result.event === DialogAction.Submit) {
        this.playlistRemoved.emit(result.data);
      }
    });
  }
}
