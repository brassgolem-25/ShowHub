import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../../core/dailog.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../../core/movie.service';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [MatSliderModule,MatIconModule,CommonModule,FormsModule,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {
  constructor(private dS:DialogService,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data:any,private mS:MovieService){
    console.log(data)
  }
  faXmark=faXmark;
  rating:number = 0;
  reviewText:string='';
  closeDialog(){
    this.dS.closeDialog()
  }
  addRating(){
    const reviewData = {
      "imdbID":this.data['imdbID'],
      "customerReview":{
        "user":this.data['userEmail'],
        "comment":this.reviewText,
        "rating":this.rating,
        "likes":0,
        "dislikes":0
      }
    }
    this.mS.updateCustomerRating(reviewData).subscribe((res)=>{
      if(res.success){
        window.location.reload();
      }
    })
  }
}
