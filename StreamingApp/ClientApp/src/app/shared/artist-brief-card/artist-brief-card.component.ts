import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUserDto } from 'src/app/api/dtos/application-user-dto';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-artist-brief-card',
  templateUrl: './artist-brief-card.component.html',
  styleUrls: ['./artist-brief-card.component.scss']
})
export class ArtistBriefCardComponent implements OnInit {

  @Input() user: ApplicationUserDto;

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
