import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TornadoService {
  currentUser: User;
  tornado: WebSocket;
  private loggedInUserSource = new Subject<User>();

  loggedInUser$ = this.loggedInUserSource.asObservable();

  constructor(private http: Http) {

  }

  getTornadoSession(user: User): void {
    this.currentUser = user;
    var ws = new WebSocket("ws://localhost:8888/websocket?id=" + this.currentUser.id + "&username=" + this.currentUser.username);
    ws.onopen = () => {
        //ws.send("PING");
        //this.messages = [];
        console.log("Socket Open");
    };
    ws.onmessage = (evt) => {
        var received_msg = evt.data;
        console.log("Message: ");
        console.log(received_msg);
        var msg : any = JSON.parse(received_msg);
        if(msg.code == 'signIn') {
          console.log('Code Sign In');
          this.loggedInUserSource.next(new User(msg.username, msg.userId, null, null, null))
        }
        //this.messages.push('Shelly (' + msg.time + ') -- ' + msg.message);
    };
    ws.onclose = function() {
      console.log("Closed");
    };

    this.tornado = ws;
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

}
