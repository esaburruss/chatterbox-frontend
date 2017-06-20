import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { TornadoService } from '../services/tornado.service';
import { DjangoService } from '../services/django.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent implements OnInit {
  selectedUser: User;
  constructor(private djangoService: DjangoService, private tornadoService: TornadoService) {
    this.selectedUser = new User({username: 'Blank'});
    tornadoService.selectedUser$.subscribe(
      user => {
        console.log('Convo:');
        console.log(user);
        this.selectedUser = user;

        //this.tornadoService.selectedUser=this.selectedUser;
    });
  }

  ngOnInit() {
  }

  userSelected(user: User) {
    console.log('Convo User:');
    console.log(user);
  }

}
