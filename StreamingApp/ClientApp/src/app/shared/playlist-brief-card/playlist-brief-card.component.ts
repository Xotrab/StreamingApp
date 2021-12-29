import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-playlist-brief-card',
  templateUrl: './playlist-brief-card.component.html',
  styleUrls: ['./playlist-brief-card.component.scss']
})
export class PlaylistBriefCardComponent implements OnInit {

  @Input() playlistBrief: PlaylistBriefDto;

  public isLoggedIn$: Observable<boolean>;

  constructor(private jwtTokenService: JwtTokenService) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public tooglePlaylistLike(): void {
    //this.isLiked = !this.isLiked;
  }
}
