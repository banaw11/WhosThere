import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
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
  user: User ;
  model: any;
  locations: Locations[] = [
    {value: '0', viewValue: 'All Country'},
    {value: '1', viewValue: 'Location 1'},
    {value: '2', viewValue: 'Location 2'},
    {value: '3', viewValue: 'Location 3'},
    {value: '4', viewValue: 'Location 4'},
  ]

  constructor(private userService: UserService, private toastrService: NbToastrService) {
   
   }

  ngOnInit(): void {
    this.userService.curentUser$.pipe().subscribe((user: User) => this.user = user);
  }

  addAge(){
    if(this.user.minAge == null){
      this.user.minAge = 1;
    }
    else{
      this.user.minAge++;
    }
  }

  subAge(){
    if(this.user.minAge != null && this.user.minAge >0){
      this.user.minAge--;
    }
  }

  save(){
    this.userService.changePublicParams(this.user).pipe().subscribe((response:boolean) => {
      if (response){
        this.toastrService.show(
          '',
          'Filters have been changed',
          {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
             status: "success", icon: "", duration: 1000}
        );
      }
      else{
        this.toastrService.show(
          'Filters have not been changed',
          'Something went wrong',
          {position : NbGlobalPhysicalPosition.BOTTOM_RIGHT,
             status: "warning", icon: "wargning-circle", duration: 1000}
        );
      }
    });
    this.closePop.emit();
  }

}
