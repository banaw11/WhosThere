import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
fittedMateId: number;
check: boolean = true;

  constructor(public onlineUserService: OnlineUserService, private router: Router) {
    this.onlineUserService.onlineUsers$.pipe().subscribe((users:number[]) => {
      this.onlineUsers=users
      this.usersLoaded = Promise.resolve(true);
    });
    this.onlineUserService.fittedMate$.pipe().subscribe((id: number)=>{
      this.fittedMateId= id
      this.check = false;
    })
   }

  ngOnInit(): void {
    
  }
}
