import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { TornadoService } from '../services/tornado.service';
import { DjangoService } from '../services/django.service';
@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.css']
})
export class ChatWrapperComponent implements OnInit {
  onlineUserList: User[]

  constructor(private djangoService: DjangoService, private tornadoService: TornadoService) {
    let inTest: boolean = true;

    if(inTest){
      this.onlineUserList = [
        new User({username: 'Test1', id: -1, conversation: new Conversation([new Message(-1, "What up!?", 123456789), new Message(1, "It's Good homie", 123456789)])}),
        new User({username: 'Test2', id: -2}),
        new User({username: 'Test3', id: -3})
      ];
    } else {
      this.onlineUserList = [];
    }
  }

  ngOnInit() {
  }

}
