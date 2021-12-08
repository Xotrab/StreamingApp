import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', []),
    username: new FormControl('', []),
    password: new FormControl('', []),
    confirmPassword: new FormControl('', [])
  });

  constructor() { }

  public ngOnInit(): void {
  }

}
