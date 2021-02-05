import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OnlineUserService } from '../_services/online-user.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  apiUrl = environment.apiUrl;

  userMenu = [{title: 'Nick'}, {title: 'Avatar'}];

  constructor(public onlineUserService: OnlineUserService, public userService: UserService) {
   }

  ngOnInit(): void {
  }

  backToHomePage(){
    this.userService.leave();
  }

  option(){
    console.log("works");
  }

}
