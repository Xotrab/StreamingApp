import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { MenuPosition } from 'src/app/helpers/menu-position';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-playlist-brief-card',
  templateUrl: './playlist-brief-card.component.html',
  styleUrls: ['./playlist-brief-card.component.scss']
})
export class PlaylistBriefCardComponent implements OnInit {

  @Input() playlistBrief: PlaylistBriefDto;
  @Input() showMenu: boolean = false;

  public isLoggedIn$: Observable<boolean>;

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  public menuPosition: MenuPosition = {
    x:'0',
    y:'0'
  };

  constructor(private jwtTokenService: JwtTokenService) { }

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
}
