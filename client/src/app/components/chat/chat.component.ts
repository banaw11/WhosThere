import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Mate } from 'src/app/_models/mate';
import { User } from 'src/app/_models/user';
import { OnlineUserService } from 'src/app/_services/online-user.service';
import { environment } from 'src/environments/environment';
import { CloseDialogComponent } from '../windows/close-dialog/close-dialog.component';

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
fittedMate: Mate;
check: boolean = true;

  constructor(public onlineUserService: OnlineUserService, private dialogService: NbDialogService, private toastrService: NbToastrService) {
    this.onlineUserService.onlineUsers$.pipe().subscribe((users:number[]) => {
      this.onlineUsers=users
      this.usersLoaded = Promise.resolve(true);
    });
    this.onlineUserService.fittedMate$.pipe().subscribe((user: Mate)=>{
      this.fittedMate = user
      this.check = false;
    })
   }

  ngOnInit(): void {
    
  }

  endConversation(){
    this.onlineUserService.disconnectChat();
  }

  openDialog(){
    if(this.fittedMate != null){
      this.dialogService.open(CloseDialogComponent).onClose.subscribe((result: boolean ) => {
        if(result){
          this.onlineUserService.disconnectChat();
        }
      });
    }
    else{
      this.toastrService.show(
        '',
        'You are currently not connected to anyone',
        {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
           status: "warning", icon: "", duration: 1500}
      );
    }
    
  }
}
