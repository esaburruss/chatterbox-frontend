import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { DjangoService } from '../services/django.service';
import { TornadoService } from '../services/tornado.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  constructor(fb: FormBuilder, private djangoService: DjangoService, private tornadoService: TornadoService) {
    this.loginForm = fb.group({
      'username': [''],
      'password': ['']
    });
    djangoService.loggedIn$.subscribe(
      loggedIn => {
        console.log(loggedIn);
        if(loggedIn) {
          this.connectTornado();
        }
    });
  }

  ngOnInit() {

  }

  onSubmit(value: Login): void {
    this.signIn(value);
  }

  signIn(login: Login): void {
    this.djangoService.tokenLogin(login);
  }

  connectTornado(): void {
    this.tornadoService.getTornadoSession(this.djangoService.currentUser);
  }

}
