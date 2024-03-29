import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationUserDto } from '../api/dtos/application-user-dto';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  public decodedUser: ApplicationUserDto;

  private jwtToken: string;

  private token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	get token$() {
		return this.token.asObservable();
	}

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	get isLoggedIn$() {
		return this.isLoggedIn.asObservable();
	}

  private username: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	get username$() {
		return this.username.asObservable();
	}

  constructor(private router: Router) { 
    this.getTokenFromLocalStorage();
  }

  public setToken(token: string): void {
    localStorage.setItem(environment.jwtTokenKey, token);
    this.jwtToken = token;
    this.token.next(this.jwtToken);
    this.decodeToken();
    this.isLoggedIn.next(true);
  }

  public decodeToken(): void {
    const encodedPayload = this.jwtToken.split('.')[1];
		const decodedPayload = atob(encodedPayload);

		const parsedObj = JSON.parse(decodedPayload);

    this.decodedUser = {
      id: +parsedObj.id,
      email: parsedObj.email,
      userName: parsedObj.username
    };

    this.username.next(this.decodedUser.userName);
  }

  public logout(): void {
    localStorage.removeItem(environment.jwtTokenKey);
    this.decodedUser = null;
    this.router.navigate(['/']);
    this.isLoggedIn.next(false);
    this.username.next(null);
    this.token.next(null);
  }

  private  getTokenFromLocalStorage(): void {
    const token = localStorage.getItem(environment.jwtTokenKey);

    if (!token)
      return;
    
    if (this.hasTokenExpired(token)) {
      this.logout();
      return;
    }

    this.jwtToken = token;
    this.decodeToken();
    this.isLoggedIn.next(true);
    this.token.next(this.jwtToken);
  }

  private hasTokenExpired(token: string): boolean {
		const encodedPayload = token.split('.')[1];
		const decodedPayload = atob(encodedPayload);

		const parsedObj = JSON.parse(decodedPayload);
		const expiry = parsedObj.exp * 1000; // we want the time in miliseconds

		const currentTime = new Date().getTime();

		return expiry <= currentTime;
	}
}
