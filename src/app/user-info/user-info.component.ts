import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username: string;
  constructor(private loginService: LoginService, private userService: UserService) {

  }

  ngOnInit() {
  }

  getUsername() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUserProfile(this.loginService.token, this.loginService.login.username);
  }

}
