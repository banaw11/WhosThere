import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Avatar } from 'src/app/_models/avatar';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.css']
})
export class AvatarFormComponent implements OnInit {
  user: User ;
avatars: Avatar[] ;
  constructor(public userService: UserService, private toastrService: NbToastrService) {
    this.userService.curentUser$.pipe().subscribe((user: User) => this.user = user);
   }

  ngOnInit(): void {
     this.userService.getAvatars().pipe().subscribe((avatars: Avatar[]) => this.avatars = avatars);
  }

  changeAvatar(url: string){
    this.user.avatar=url;
    this.userService.changeUserParams(this.user).pipe().subscribe((response: boolean) => {
      if(response){
        this.toastrService.show(
          '',
          'Avatar has been changed',
          {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
             status: "primary", icon: "", duration: 1000}
        );
      }
      else{
        this.toastrService.show(
          'Avatar has not been changed',
          'Something went wrong',
          {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
             status: "danger", icon: "warning-cirlce", duration: 1000}
        );
      }
    });
    
  }

}
