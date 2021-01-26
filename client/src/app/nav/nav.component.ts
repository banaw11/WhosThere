import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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


  constructor(public onlineUserService: OnlineUserService, public userService: UserService) {
   }

  ngOnInit(): void {
  }

  backToHomePage(){
    this.userService.leave();
  }

}
