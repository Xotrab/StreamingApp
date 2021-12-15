import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-playlist-brief-card',
  templateUrl: './playlist-brief-card.component.html',
  styleUrls: ['./playlist-brief-card.component.scss']
})
export class PlaylistBriefCardComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public isLiked: boolean = false;

  constructor(private jwtTokenService: JwtTokenService) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public tooglePlaylistLike(): void {
    this.isLiked = !this.isLiked;
  }
}
