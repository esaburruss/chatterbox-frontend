import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  username: string;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
  }

  getUsername() {
    console.log(this.loginService.getLogin().username);
  }

}
