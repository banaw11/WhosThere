import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { OnlineUserService } from 'src/app/_services/online-user.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {
user : User;
mateId: number;
  constructor( public onlineUserService: OnlineUserService) { }

  ngOnInit(): void {
  }

  sendMessage(message: Message){
    this.onlineUserService.sendMessage(message);
  }
  

}
