import { Component, OnInit} from '@angular/core';
import { NbMenuService, NbWindowService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { OnlineUserService } from '../../_services/online-user.service';
import { UserService } from '../../_services/user.service';
import { AvatarDialogComponent } from '../windows/avatar-dialog/avatar-dialog.component';
import { NickDialogComponent } from '../windows/nick-dialog/nick-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  apiUrl = environment.apiUrl;
  userMenu = [{title: 'Nick'}, {title: 'Avatar'}];
  user: User  ;
  windowRef: any;

  constructor(public onlineUserService: OnlineUserService, public userService: UserService, private menuService: NbMenuService,
     private windowService: NbWindowService) {
       this.userService.curentUser$.pipe().subscribe((user : User) => {
        this.user = user;
        if(this.windowRef){
          this.windowRef.close();
        }
       });
   }

  ngOnInit(): void {
    this.onMenuClick();
  }

  backToHomePage(){
    this.userService.leave();
  }

  showAvatarDialog(){
    this.windowRef = this.windowService.open(AvatarDialogComponent, {title: 'Change Avatar', hasBackdrop: true, closeOnEsc: false});
  }

  showNickDialog(){
    this.windowRef = this.windowService.open(NickDialogComponent, {title: 'Change Nick', hasBackdrop: true, closeOnEsc: false});
  }

  onMenuClick(){
    this.menuService.onItemClick().pipe(
      filter(({tag}) => tag === 'user-menu'),
      map(({item: {title }}) => title),).subscribe(title =>{
        if(title === 'Avatar'){
          this.showAvatarDialog();
        }
        if(title === 'Nick'){
          this.showNickDialog();
        }
      } );
  }
}
