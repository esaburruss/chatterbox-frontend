import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  tornadoSession: WebSocket;
  username: string;
  constructor(fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = fb.group({
      'username': [''],
      'password': ['']
    });
  }

  ngOnInit() {

  }

  onSubmit(value: Login): void {
    this.signIn(value);
  }

  signIn(login: Login): void {

    this.loginService.tokenLogin(login);

    console.log('username: ', this.loginService.getLogin().username);
    console.log('password: ', this.loginService.getLogin().password);
  }

}
