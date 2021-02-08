import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.css']
})
export class CloseDialogComponent{

  constructor(protected ref: NbDialogRef<CloseDialogComponent>) { }

  submit(result: boolean){
    this.ref.close(result);
  }

}
