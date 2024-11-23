import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { LocationDialogComponent } from '../shared/location-dialog/location-dialog.component';
import { ReviewDialogComponent } from '../shared/review-dialog/review-dialog.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog,private http:HttpClient) { }

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

  getCitiesList():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/city/getCitiesList');
  }
}
