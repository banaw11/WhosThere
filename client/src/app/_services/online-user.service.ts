import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mate } from '../_models/mate';
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
  private fittedMateSource = new BehaviorSubject<Mate>(null);
  fittedMate$ = this.fittedMateSource.asObservable();
  private fittingMateSource = new BehaviorSubject<boolean>(true);
  fittingMate$ = this.fittingMateSource.asObservable();
  mateDisconnectedSource = new BehaviorSubject<boolean>(false);
  mateDisconnected$ = this.mateDisconnectedSource.asObservable();
  iDisconnextedSource = new BehaviorSubject<boolean>(false);
  iDisconnected$ = this.iDisconnextedSource.asObservable();
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

      this.hubConnection.on("FittedMate", (mate: Mate) =>{
        this.mateId = mate.id;
        this.fittedMateSource.next(mate);
        this.fittingMateSource.next(false);
        this.mateDisconnectedSource.next(false);
      });

      this.hubConnection.on("MateDisconnected", () =>{
        this.mateDisconnectedSource.next(true);
        this.fittedMateSource.next(null);
      });

      this.hubConnection.on("GetMessage", (message: Message) =>{
         this.messages.push(message);
      });

      this.hubConnection.on("MateChangedParams", (mate: Mate) => {
        this.fittedMateSource.next(mate);
      })
      
  }

  async sendMessage(message: Message){
    message.reply = true;
    this.messages.push(message);
    return this.hubConnection.invoke("SendMessage", {recipientId: this.mateId, message: message.message })
      .catch(error => console.log(error));
  }

  async joinToQueue(){
    this.fittingMateSource.next(true);
    this.iDisconnextedSource.next(false);
    this.messages = [];
    return this.hubConnection.invoke("FindChatMate").catch(error => console.log(error));
  }

  async updateStatus(){
    return this.hubConnection.invoke("ChangeStatus", true, 0).catch(error => console.log(error));
  }

  async updateParams(mate: User){
    return this.hubConnection.invoke("ChangedParams", mate, this.mateId).catch(error => console.log(error));
  }

  async endChatSession(){
    return this.hubConnection.invoke("EndChatSession", this.mateId).catch(error => console.log(error));
  }

  sendChangeInfo(mate: User){
    if(this.fittedMate$ != null){
      this.updateParams(mate);
    }
  }

  disconnectChat(){
    this.endChatSession();
    this.fittedMateSource.next(null);
    this.iDisconnextedSource.next(true);
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.fittingMateSource.next(true);
      this.fittedMateSource.next(null);
      this.iDisconnextedSource.next(false);
      this.messages = [];
      this.hubConnection.stop().catch(error => console.log(error));
    }
    
  }
}
