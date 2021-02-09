import { Component } from '@angular/core';
import { FormBuilder,  Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Avatar } from 'src/app/_models/avatar';
import { UserService } from 'src/app/_services/user.service';

interface Locations {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.css']
})
export class JoinFormComponent  {
locations: Locations[] = [
  {value: '0', viewValue: 'All Country'},
  {value: '1', viewValue: 'Location 1'},
  {value: '2', viewValue: 'Location 2'},
  {value: '3', viewValue: 'Location 3'},
  {value: '4', viewValue: 'Location 4'},
];
model : any = {};
avatars: Avatar[] ;
filtersMode: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, public menuService: NbMenuService){
    this.userService.getAvatars().pipe().subscribe((avatars: Avatar[]) => this.avatars = avatars);
  }

myForm = this.fb.group({
    gender: ['', Validators.required],
    selectedGender: [''],
    location: [''],
    minAge: [''],
  })

  join(){
    this.userService.join(this.model).subscribe(response => {
      this.router.navigateByUrl('/chat');
    }), error => {
      console.log(error);
    };
  }
 
  changeAvatar(url: string){
    this.model.avatar = url;
  }

  addAge(){
    if(this.model.minAge == null){
      this.model.minAge = 1;
    }
    else{
      this.model.minAge++;
    }
  }

  subAge(){
    if(this.model.minAge != null && this.model.minAge >0){
      this.model.minAge--;
    }
  }

  openFilters(){
    this.filtersMode =!this.filtersMode;
  }


}
