import { Component, OnInit } from '@angular/core';
import { User } from '../user-info/user.model';
import { DjangoService } from '../services/django.service';
import { TornadoService } from '../services/tornado.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
  onlineUsers: Array<User> = [];
  constructor(private djangoService: DjangoService, private tornadoService: TornadoService) {

    tornadoService.loggedInUser$.subscribe(
      newUser => {
        console.log(newUser);
        this.onlineUsers.push(newUser);
    });
  }

  ngOnInit() {
  }

}
