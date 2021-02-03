import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class OnlineUserService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<number[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();
  private fittedMateSource = new BehaviorSubject<number>(null);
  fittedMate$ = this.fittedMateSource.asObservable();
  private fittingMateSource = new BehaviorSubject<boolean>(true);
  fittingMate$ = this.fittingMateSource.asObservable();
  mateId : number;
  messages: Message[] = [];

  constructor() { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'online', { accessTokenFactory: () => user.token})
      .withAutomaticReconnect()
      .build()

      this.hubConnection.start().catch(error => console.log(error));
      
      this.hubConnection.on("GetOnlineUsers", (iDs : number[]) => {
        this.onlineUsersSource.next(iDs);
      });

      this.hubConnection.on("FittedMate", (id: number) =>{
        this.mateId = id;
        this.fittedMateSource.next(id);
        this.fittingMateSource.next(false);
        console.log("ID= "+this.mateId);
      });

      this.hubConnection.on("MateDisconnected", () =>{
        console.log("Mate ended chat");
        this.fittingMateSource.next(true);
        this.fittedMateSource.next(null);
        this.messages = [];
      });

      this.hubConnection.on("GetMessage", (message: Message) =>{
         this.messages.push(message);
      })
      
  }

  async sendMessage(message: Message){
    message.reply = true;
    this.messages.push(message);
    return this.hubConnection.invoke("SendMessage", {recipientId: this.mateId, message: message.message })
      .catch(error => console.log(error));
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.fittingMateSource.next(true);
      this.fittedMateSource.next(null);
      this.messages= [];
      this.hubConnection.stop().catch(error => console.log(error));
    }
    
  }
}
