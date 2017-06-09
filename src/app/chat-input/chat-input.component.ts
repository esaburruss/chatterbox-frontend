import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  chatForm: FormGroup;
  messages: string[];
  constructor(fb: FormBuilder, private userService: UserService) {
    this.chatForm = fb.group({
      'message': ['']
    });
  }

  ngOnInit() {
    this.messages = [];
    this.messages.push("message");
  }

  sendMessage(message: string) {
    console.log(message);
    this.userService.sendMessage(2, message)
  }

  newMessage() {

  }
}