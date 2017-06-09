import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../user-info/user.model';

@Injectable()
export class UserService {
  user: User;
  token: string;
  tornado: WebSocket;
  messages: string[];

  constructor(private http: Http) {

  }


  getTornadoSession(): WebSocket {
    var ws = new WebSocket("ws://localhost:8888/websocket?Id=" + this.user.id);
    ws.onopen = () => {
        //ws.send("PING");
        this.messages = [];
        console.log("Socket Open");
    };
    ws.onmessage = (evt) => {
        var received_msg = evt.data;
        console.log("Message: ");
        console.log(received_msg);
        var msg:Msg = JSON.parse(received_msg);
        this.messages.push('Shelly (' + msg.time + ') -- ' + msg.message);
    };
    ws.onclose = function() {
      console.log("Closed");
    };

    return ws;
  }

  sendMessage(id: number, message: string) {
    this.tornado.send('{"id": ' + id + ', "message": "' + message + '"}');
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
        this.tornado = this.getTornadoSession();
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
