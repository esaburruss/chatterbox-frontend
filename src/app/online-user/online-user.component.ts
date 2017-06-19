import {
  Component,
  OnInit,
  Input,
  HostBinding
  } from '@angular/core';
  import { User } from '../models/user.model'

@Component({
  selector: 'app-online-user',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.css']
})
export class OnlineUserComponent {
  @Input() user: User;
  @HostBinding('attr.class') cssClass = 'user list-group-item';

}
