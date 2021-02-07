import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

interface Locations {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.css']
})


export class FiltersFormComponent implements OnInit {
  @Output("closePop") closePop = new EventEmitter<any>();
  user: User = {
    gender: "",
    selectedGender: "",
    location: "",
    ageFrom: 0,
    ageTo: 0,
    token: "",
    id: 0,
    avatar: "",
    nick: "",
  };
  model: any;
  locations: Locations[] = [
    {value: '0', viewValue: 'All Country'},
    {value: '1', viewValue: 'Location 1'},
    {value: '2', viewValue: 'Location 2'},
    {value: '3', viewValue: 'Location 3'},
    {value: '4', viewValue: 'Location 4'},
  ]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addAge(){
    if(this.user.ageFrom == null){
      this.user.ageFrom = 1;
    }
    else{
      this.user.ageFrom++;
    }
  }

  subAge(){
    if(this.user.ageFrom != null && this.user.ageFrom >0){
      this.user.ageFrom--;
    }
  }

  save(){
    this.userService.changeUserParams(this.user);
    this.closePop.emit();
  }

}
