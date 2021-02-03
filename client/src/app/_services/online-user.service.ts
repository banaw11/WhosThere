import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      });

  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop().catch(error => console.log(console.error()));
    }
    
  }
}
