import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DjangoService {
  login: Login;
  token: string;
  loggedIn: boolean;
  currentUser: User;
  private loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.asObservable();

  private chatSource = new Subject<User>();
  chat$ = this.chatSource.asObservable();

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
        //this.loggedIn = true;
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
        this.loggedInSource.next(true);
      });
  }

  getOldMessages(user: User): void {
    this.http.get(
    'http://127.0.0.1:8000/api/chat/' + user.id + '/',
    {headers: new Headers({'Authorization': 'Token ' + this.token})}
    )
    .subscribe((res: Response) => {
      console.log(res.json());
      let json = res.json();

      user.firstName = json.profile.firstName;
      user.lastName = json.profile.lastName;
      user.setGender(json.profile.gender);
      for(let msg of json.messages) {
        user.conversation.addMessage(new Message(msg.profile_from, msg.message_body, msg.timestamp));
      }
      console.log("Complete Profile");
      console.log(user);
      this.chatSource.next(user);
    });
  }

  testLogin = (res: Response) => {
    console.log(res.json());
    console.log(this.login);
    this.token = res.json().token;
  }
}
