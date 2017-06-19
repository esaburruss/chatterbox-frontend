import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TornadoService {
  currentUser: User;
  tornado: WebSocket;

  private loggedInUserSource = new Subject<User>();
  loggedInUser$ = this.loggedInUserSource.asObservable();

  private newMessageSource = new Subject<Message>();
  newMessage$ = this.newMessageSource.asObservable();

  private sentMessageSource = new Subject<string>();
  sentMessage$ = this.sentMessageSource.asObservable();

  selectedUser: User;
  private selectedUserSource = new Subject<User>();
  selectedUser$ = this.selectedUserSource.asObservable();

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
        let msg : any = JSON.parse(received_msg);
        if(msg.code == 'signIn') {
          console.log('Code Sign In');
          this.loggedInUserSource.next(new User({username: msg.username, id: msg.userId}))
        }
        if(msg.code == 'online-users') {
          for(let user of msg.users) {
            this.loggedInUserSource.next(new User({username: user.username, id: user.id}))
          }
        }
        if(msg.code == 'message') {
          this.newMessageSource.next(new Message(msg.from, msg.message, msg.time));
        }
        //this.messages.push('Shelly (' + msg.time + ') -- ' + msg.message);
    };
    ws.onclose = function() {
      console.log("Closed");
    };

    this.tornado = ws;
  }

  sendMessage(message: string) {
    //this.tornado.send('{"id": ' + id + ', "message": "' + message + '"}');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = 'http://127.0.0.1:8888/msg';
    let jsn = '{"from_id": ' + this.currentUser.id + ', "to_id": ' + this.selectedUser.id + ', "message": "' + message + '"}';
    console.log('Trying to POST');
    console.log(jsn);
    this.http.post(
      url,
      jsn,
      options
    )
    .subscribe((res: Response) => {
      //console.log(res.json());
      this.sentMessageSource.next(message)
    });//.catch(this.handleError);

  }

  changeConversation(user: User) {
    this.selectedUserSource.next(user);
    this.selectedUser = user;
  }

}
