import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-artist-brief-card',
  templateUrl: './artist-brief-card.component.html',
  styleUrls: ['./artist-brief-card.component.scss']
})
export class ArtistBriefCardComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public isFollowed: boolean = false;

  constructor(private jwtTokenService: JwtTokenService) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
  }

  public toogleArtistFollow(): void {
    this.isFollowed = !this.isFollowed;
  }
}
