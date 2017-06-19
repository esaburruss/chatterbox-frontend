import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { TornadoService } from '../services/tornado.service';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  incoming: boolean;

  constructor(private tornadoService: TornadoService) {

  }

  ngOnInit() {
    if(this.message.from == this.tornadoService.currentUser.id) {
      this.incoming = true;
    } else {
      this.incoming = false;
    }
  }

}
