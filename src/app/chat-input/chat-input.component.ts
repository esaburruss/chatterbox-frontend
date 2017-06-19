import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { TornadoService } from '../services/tornado.service';
import { DjangoService } from '../services/django.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  chatForm: FormGroup;
  messages: string[];
  constructor(fb: FormBuilder, private djangoService: DjangoService, private tornadoService: TornadoService) {
    this.chatForm = fb.group({
      'message': ['']
    });
  }

  ngOnInit() {
    this.messages = [];
    //this.messages.push("message");
  }

  sendMessage(message: string) {
    console.log(message);
    this.tornadoService.sendMessage(message);
    //this.userService.sendMessage(2, message)
  }

  newMessage() {

  }
}
