import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
