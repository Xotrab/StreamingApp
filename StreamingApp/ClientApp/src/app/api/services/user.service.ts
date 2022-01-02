import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { ApplicationUserDto } from '../dtos/application-user-dto';
import { LoginDto } from '../dtos/login-dto';
import { RegisterDto } from '../dtos/register-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  public register(registerDto: RegisterDto): Observable<void> {
    const url = environment.appUrl + '/register';
    return this.http.post<void>(url, registerDto);
  }

  public login(loginDto: LoginDto): Observable<ApiResponse<string>> {
    const url = environment.appUrl + '/login';
    return this.http.post<ApiResponse<string>>(url, loginDto);
  }

  public getUserFollows(): Observable<ApiResponse<ApplicationUserDto[]>> {
    const url = environment.appUrl + '/follows';
    return this.http.get<ApiResponse<ApplicationUserDto[]>>(url);
  }

  public followUser(followedId: number): Observable<ApiResponse<any>> {
    const url = environment.appUrl + '/follows/' + followedId;
    return this.http.post<ApiResponse<any>>(url, null);
  }

  public unfollowUser(followedId: number): Observable<ApiResponse<any>> {
    const url = environment.appUrl + '/follows/' + followedId
    return this.http.delete<ApiResponse<any>>(url);
  }
}
