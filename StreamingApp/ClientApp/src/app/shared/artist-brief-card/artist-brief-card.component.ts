import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApplicationUserDto } from 'src/app/api/dtos/application-user-dto';
import { UserService } from 'src/app/api/services/user.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-artist-brief-card',
  templateUrl: './artist-brief-card.component.html',
  styleUrls: ['./artist-brief-card.component.scss']
})
export class ArtistBriefCardComponent implements OnInit {

  @Input() user: ApplicationUserDto;
  @Output() userUnfollowed = new EventEmitter<number>();

  public isLoggedIn$: Observable<boolean>;
  public isLoggedInUser: boolean = false;

  public pluralMap = {
    '=0': '0 songs',
    '=1': '1 song',
    'other': '# songs'
  };

  constructor(private jwtTokenService: JwtTokenService, private userService: UserService, private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
    this.isLoggedInUser = this.jwtTokenService.decodedUser?.id === this.user.id;
  }

  public followArtist(): void {
    this.userService.followUser(this.user.id).subscribe(result => {
      this.user.followedByUser = true;
      this.user.numberOfFollowers +=1;

      this.snackBar.open(
        this.user.userName + " has been followed", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
    });
  }

  public unfollowArtist(): void {
    this.userService.unfollowUser(this.user.id).subscribe(result => {
      this.user.followedByUser = false;
      this.user.numberOfFollowers -=1;
      this.userUnfollowed.emit(this.user.id);

      this.snackBar.open(
        this.user.userName + " has been unfollowed", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
    });
  }
}
