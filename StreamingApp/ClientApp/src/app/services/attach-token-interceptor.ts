import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AttachTokenInterceptor implements HttpInterceptor {

  private token: string;

  constructor(private jwtTokenService: JwtTokenService) { 
    this.jwtTokenService.token$.subscribe(result => this.token = result);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = !!this.token ? req.clone(
        {setHeaders: {
            Authorization: `Bearer ${this.token}`}
    }) : req;

    return next.handle(request);
  }
}
