import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage(message: Message){
    this.messageService.sendMessage(message);
  }
    

}
