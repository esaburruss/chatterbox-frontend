import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  Component,
  Inject
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpModule,
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ChatInputComponent } from './chat-input/chat-input.component';

import { LoginModule } from './login-form/login.module';
import { UserModule } from './user-info/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    UserInfoComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AlertModule.forRoot(),

    LoginModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
