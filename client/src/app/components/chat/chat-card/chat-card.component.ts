import { Component, Input } from '@angular/core';
import { Mate } from 'src/app/_models/mate';
import { Message } from 'src/app/_models/message';
import { OnlineUserService } from 'src/app/_services/online-user.service';
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent{
  @Input() mate: Mate;
  mateId: number;


  constructor( public onlineUserService: OnlineUserService, public userService: UserService) { }


  sendMessage(message: Message){
    this.onlineUserService.sendMessage(message);
  }
  
  joinToQueue(){
    this.onlineUserService.joinToQueue();
  }


}
