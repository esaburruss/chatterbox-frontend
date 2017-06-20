import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { DjangoService } from '../services/django.service';
import { TornadoService } from '../services/tornado.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
  @Input() onlineUsers: User[];
  //@Output() onUserSelected: EventEmitter<User>;

  private currentUser: User;
  constructor(private djangoService: DjangoService, private tornadoService: TornadoService) {
    tornadoService.loggedInUser$.subscribe(
      newUser => {
        console.log(newUser);
        this.onlineUsers.push(newUser);
    });
    tornadoService.newMessage$.subscribe(
      message => {
        console.log(message);
        for(let u of this.onlineUsers) {
          if(u.id == message.from) {
            u.conversation.messages.push(message);
          }
        }
    });
    tornadoService.sentMessage$.subscribe(
      message => {
        console.log(message);
        for(let u of this.onlineUsers) {
          if(u.id == this.tornadoService.selectedUser.id) {
            u.conversation.messages.push(new Message(this.djangoService.currentUser.id, message, Date.now()));
          }
        }
    });
    djangoService.chat$.subscribe(
      user => {
        //this.onlineUsers.push(newUser);
        this.tornadoService.changeConversation(user);
    });

  }

  ngOnInit() {
  }

  clicked(user: User): void {
    this.currentUser = user;
    console.log(user);
    this.djangoService.getOldMessages(user);
    //this.tornadoService.changeConversation(user);
  }

  isSelected(user: User): boolean {
    if (!user || !this.currentUser) {
      return false;
    }
    return user.id === this.currentUser.id;
  }

}
