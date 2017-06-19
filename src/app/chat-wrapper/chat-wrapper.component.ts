import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
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
        new User({username: 'Test1', id: -1}),
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
