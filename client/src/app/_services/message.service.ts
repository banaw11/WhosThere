import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { OnlineUserService } from './online-user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  messages: Message[] = [];

  constructor(private onlineUserService: OnlineUserService) { }

  createHubConnection(user: User, otherUserId: number ){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + "message" + {accessTokenFactory: () => user.token})
      .withAutomaticReconnect()
      .build()

      this.hubConnection.start().catch(error => console.log(error));

      this.hubConnection.on("NewMessage", (message: Message) => {
        this.getMessage(message);
      })
  }

 async sendMessage(message: Message){
    message.reply = true;
    this.messages.push(message);
    return this.hubConnection.invoke("SendMessage", {reciepentId: this.onlineUserService.fittedMate$, content: message.message })
      .catch(error => console.log(error));
  }

  getMessage(message: Message){
    message.reply = false;
    this.messages.push(message);
  }

  
}
