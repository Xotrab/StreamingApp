import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/api/dtos/login-dto';
import { UserService } from 'src/app/api/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.minLength(1), Validators.maxLength(100)]),
    password: new FormControl('', [Validators.minLength(5), Validators.maxLength(25)])
  });

  public showSpinner: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

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
        console.log(response.data);
      }
      this.showSpinner = false;
      }, _ => this.showSpinner = false);
  }
}
