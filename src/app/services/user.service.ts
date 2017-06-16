import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  user: User;
  token: string;
  messages: string[];

  constructor(private http: Http) {

  }

  sendMessage(id: number, message: string) {
    //this.tornado.send('{"id": ' + id + ', "message": "' + message + '"}');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = 'http://127.0.0.1:8888/msg';
    let jsn = '{"from_id": 1, "to_id": ' + id + ', "message": "' + message + '"}';
    console.log('Trying to POST');
    console.log(jsn);
    this.http.post(
      url,
      jsn,
      options
    )
    .subscribe((res: Response) => {
      console.log(res.json());
    });//.catch(this.handleError);

  }

  getUserProfile(token: string, username: string) {
    console.log('Authorization: Token ' + token);
    this.http.get(
      'http://127.0.0.1:8000/api/profile/',
      //'Authorization: Token ' + token
      {headers: new Headers({'Authorization': 'Token ' + token})}
      )
      .subscribe((res: Response) => {
        console.log(res.json());
        this.user = new User(username, res.json().pk, res.json().gender, res.json().firstName, res.json().lastName);
        //this.tornado = this.getTornadoSession();
      });
  }

  setUser(newUser) {
    this.user = newUser;
  }

  getUser(): any {
    return this.user;
  }
}

interface Msg{
  time:number;
  id:number;
  message:string;
}
