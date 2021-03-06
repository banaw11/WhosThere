import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { OnlineUserService } from './online-user.service';
import { Avatar } from '../_models/avatar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  curentUser$ = this.currentUserSource.asObservable();
  private quantityUsersSource = new ReplaySubject<number>(1);
  quantityUsers$ = this.quantityUsersSource.asObservable();

  formData: FormData;

  constructor(private http: HttpClient, private onlineUserService: OnlineUserService) { }

  join(model: any){
    return this.http.post(this.baseUrl + 'users/join', model).pipe(
      map((user: User) =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.onlineUserService.createHubConnection(user);
        }
        return user;
      })
    );
  }

  leave(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.onlineUserService.stopHubConnection();
  }

  changeUserParams(user: User){
    return this.http.post(this.baseUrl + "users/change", user).pipe(
      map((response: boolean) => {
        if(response){
          this.currentUserSource.next(user);
          this.onlineUserService.sendChangeInfo(user);
        } return response;
      })
    );
  }

  getAvatars(){
    return this.http.get<Avatar[]>(this.baseUrl + "users/avatars");
  }
}
