import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
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
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){}

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



}
