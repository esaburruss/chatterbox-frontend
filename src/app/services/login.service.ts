import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Login } from '../login-form/login.model';

@Injectable()
export class LoginService {
  login: Login;
  token: string;
  loggedIn: boolean;

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
      });
  }

  testLogin = (res: Response) => {
    console.log(res.json());
    console.log(this.login);
    this.token = res.json().token;
  }
}
