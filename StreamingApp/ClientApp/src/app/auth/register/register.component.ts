import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/api/dtos/register-dto';
import { UserService } from 'src/app/api/services/user.service';
import { PasswordStateMatcher } from 'src/app/helpers/password-state-matcher';
import { emailValidator, matchingPasswordValidator, passwordValidator, usernameValidator } from 'src/app/helpers/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [emailValidator]),
    username: new FormControl('', [usernameValidator]),
    password: new FormControl('', [passwordValidator]),
    confirmPassword: new FormControl('', [passwordValidator])
  }, {validators: matchingPasswordValidator});

  public passwordStateMatcher = new PasswordStateMatcher();

  constructor(private userService: UserService, private router: Router) { }

  public ngOnInit(): void {
  }

  public submitForm(): void {
    if (this.registerFormGroup.invalid)
      //TODO show snackbar message
      return;
    
    const registerDto: RegisterDto = {
      userName: this.registerFormGroup.get('username').value,
      email: this.registerFormGroup.get('email').value,
      password: this.registerFormGroup.get('password').value,
      confirmPassword: this.registerFormGroup.get('confirmPassword').value
    };

    this.userService.register(registerDto).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
