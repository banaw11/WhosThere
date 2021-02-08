import { Component } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-nick-form',
  templateUrl: './nick-form.component.html',
  styleUrls: ['./nick-form.component.css']
})
export class NickFormComponent {
  user: User ;

  constructor(public userService: UserService, private toastrService: NbToastrService) {
    this.userService.curentUser$.pipe().subscribe((user:User) => this.user = user);
   }

    changeNick(){
      this.userService.changeUserParams(this.user).pipe().subscribe((response: boolean) => {
        if(response){
          this.toastrService.show(
            `Your new nick is: ${this.user.nick}`,
            'Nick has been changed',
            {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
               status: "primary", icon: "", duration: 2000}
          );
        }
        else{
          this.toastrService.show(
            `Nick has not been changed`,
            'Something went wrong',
            {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
               status: "warning", icon: "alert-cricle", duration: 2000}
          );
        }
      });
      
    }
}
