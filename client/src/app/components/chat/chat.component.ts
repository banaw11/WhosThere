import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { OnlineUserService } from 'src/app/_services/online-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  usersLoaded: Promise<boolean>;

@HostListener('window:beforeunload') backToHomePage(){
  this.onlineUserService.stopHubConnection();
}
onlineUsers: number[] = [];
fittedMate: User;
check: boolean = true;

  constructor(public onlineUserService: OnlineUserService, private router: Router) {
    this.onlineUserService.onlineUsers$.pipe().subscribe((users:number[]) => {
      this.onlineUsers=users
      this.usersLoaded = Promise.resolve(true);
    });
    this.onlineUserService.fittedMate$.pipe().subscribe((user: User)=>{
      this.fittedMate = user
      this.check = false;
    })
   }

  ngOnInit(): void {
    
  }
}
