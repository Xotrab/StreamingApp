import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistDto } from '../api/dtos/playlist-dto';
import { Genre } from '../helpers/genre.enum';
import { SidebarOption } from '../helpers/sidebar-option.enum';
import { AudioPlayerService } from '../services/audio-player.service';
import { JwtTokenService } from '../services/jwt-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public userName: string;

  public sidebarOption = SidebarOption;
  public selectedOption: SidebarOption = this.sidebarOption.Home;

  public searchFilter: string;
  public genreEnum = Genre;

  public openedPlaylist: PlaylistDto = null;

  constructor(private router: Router, private jwtTokenService: JwtTokenService, private audioPlayerService: AudioPlayerService) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
    this.userName = this.jwtTokenService.decodedUser?.userName;

    this.audioPlayerService.openedPlaylist$.subscribe(result => {
      this.openedPlaylist = result;
      if (this.openedPlaylist) {
        this.selectedOption = this.sidebarOption.PlaylistView;
      }
    });
  }

  public navigateToRegisterForm(): void {
    this.router.navigate(['/auth/register']);
  }

  public navigateToLoginForm(): void {
    this.router.navigate(['/auth/login']);
  }

  public logout(): void {
    this.jwtTokenService.logout();
  }

  public sidebarOptionChanged($event): void {
    this.audioPlayerService.closePlaylist();
    this.selectedOption = $event;
  }

  public clearInput(): void {
    this.searchFilter = null;
  }
}
