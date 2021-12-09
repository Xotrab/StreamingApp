import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtTokenService } from '../services/jwt-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public userName: string;

  constructor(private router: Router, private jwtTokenService: JwtTokenService) { }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.jwtTokenService.isLoggedIn$;
    this.userName = this.jwtTokenService.decodedUser?.userName;
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
}
