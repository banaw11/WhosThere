import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { Mate } from 'src/app/_models/mate';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { OnlineUserService } from 'src/app/_services/online-user.service';
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {
  @Input() mate: Mate;
@ViewChild(NbPopoverDirective) popover : NbPopoverDirective;
  mateId: number;


  constructor( public onlineUserService: OnlineUserService, public userService: UserService) { }

  ngOnInit(): void {
  }

  sendMessage(message: Message){
    this.onlineUserService.sendMessage(message);
  }
  
  joinToQueue(){
    this.onlineUserService.joinToQueue();
  }

  openPop(){
    if(this.popover.isShown == false){
      this.popover.show();
    }
  }

  closePop(){
    if(this.popover.isShown){
      this.popover.hide();
      this.joinToQueue();
    }
  }

  

  

}
