import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
import { MenuPosition } from 'src/app/helpers/menu-position';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
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

  constructor(private jwtTokenService: JwtTokenService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public tooglePlaylistLike(): void {
    //this.isLiked = !this.isLiked;
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
