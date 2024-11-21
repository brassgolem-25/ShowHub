import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { LocationDialogComponent } from '../shared/location-dialog/location-dialog.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(locationData:{}){
    this.dialog.open(LocationDialogComponent,{
      width:'800px',
      data:locationData
    })
  }

  openReviewDialog(movieData:{}){
    this.dialog.open(ReviewDialogComponent,{
      width:'390px',
      data:movieData
    })
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
