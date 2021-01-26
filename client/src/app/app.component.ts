import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineUserService } from './_services/online-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private onlineUserService: OnlineUserService, private router: Router){}
  
  ngOnInit(): void {
  this.onlineUserService.stopHubConnection();
  this.router.navigateByUrl('/');
  }
  title = "The Who's there - app";
  
}
