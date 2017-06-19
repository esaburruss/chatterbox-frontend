import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { TornadoService } from '../services/tornado.service';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {
  login: Login;
  token: string;
  loggedIn: boolean;
  currentUser: User

  constructor(private http: Http) {

  }

  setLogin(newLogin) {
    this.login = newLogin;
  }

  getLogin(): any {
    return this.login;
  }

  tokenLogin(login) {
    this.login = login;
    this.http.post(
      'http://127.0.0.1:8000/api/get_auth_token/',
      JSON.stringify({
        username: this.login.username,
        password: this.login.password
      }),
      {headers: new Headers({'Content-Type': 'application/json'})})
      .subscribe((res: Response) => {
        console.log(res.json());
        console.log(this.login);
        this.token = res.json().token;
        this.loggedIn = true;
        this.getUserProfile();
      });
  }

  getUserProfile() {
    this.http.get(
      'http://127.0.0.1:8000/api/profile/',
      {headers: new Headers({'Authorization': 'Token ' + this.token})}
      )
      .subscribe((res: Response) => {
        console.log(res.json());
        this.currentUser = new User({username: this.login.username, id: res.json().pk, gender: res.json().gender, firstName: res.json().firstName, lastName: res.json().lastName});
        console.log(this.currentUser);
      });
  }

  testLogin = (res: Response) => {
    console.log(res.json());
    console.log(this.login);
    this.token = res.json().token;
  }
}
