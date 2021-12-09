import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/api/dtos/login-dto';
import { UserService } from 'src/app/api/services/user.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', [])
  });

  public showSpinner: boolean = false;

  constructor(private userService: UserService, private router: Router, private jwtTokenService: JwtTokenService) { }

  public ngOnInit(): void {

  }

  public navigateToRegisterForm(): void {
    this.router.navigate(['/auth/register']);
  }

  public submitForm(): void {
    if (this.loginFormGroup.invalid)
      return;
    
    const loginDto: LoginDto = {
      email: this.loginFormGroup.get('email').value,
      password: this.loginFormGroup.get('password').value,
    };

    this.showSpinner = true;

    this.userService.login(loginDto).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/']);
        this.jwtTokenService.setToken(response.data);
        console.log(response.data);
      }
      this.showSpinner = false;
      }, _ => this.showSpinner = false);
  }
}
