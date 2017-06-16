import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../services/django.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username: string;
  constructor(private djangoService: DjangoService) {

  }

  ngOnInit() {
  }

  getUsername() {
    this.getUserProfile();
  }
  getUserProfile() {
    //this.userService.getUserProfile(this.djangoService.token, this.djangoService.login.username);
  }

}
