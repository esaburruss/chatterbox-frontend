import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Login } from '../login-form/login.model';

@Injectable()
export class LoginService {
  login: Login;
  token: string
  //http: Http;
  constructor(private http: Http) {
    //this.http = http;
  }

  setLogin(newLogin) {
    this.login = newLogin;
  }

  getLogin(): any {
    return this.login;
  }

  getCsrf() {
    this.http.request('http://127.0.0.1:8000/api/token/')
    /*.map((response: Response) => {
      return (<any>response.json()).items.map(item => {
        console.log("raw item", item); // uncomment if you want to debug
        //this.setCookie(item.csrftoken);
        //this.token = item.csrftoken;
      });
    });*/
    .subscribe((res: Response) => {
      console.log(res.json());
      //this.setCookie(res.json("csrftoken"));
      //console.log(this.getCookie('csrftoken'));
    });
  }

  getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

  sessionLogin(login) {
    this.login = login;
    this.http.post(
      'http://127.0.0.1:4200/api/login/',
      JSON.stringify({
        username: 'esaburruss',
        password: 'p@ssword',
        csrfmiddlewaretoken: this.getCookie('csrftoken')
      }))
      .subscribe((res: Response) => {
        console.log(res.json());
      });
  }
}
