import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../../core/dailog.service';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [MatSliderModule,MatIconModule,CommonModule,FormsModule,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {
  constructor(private dS:DialogService){}
  faXmark=faXmark;
  rating:number = 0;
  reviewText:string='';
  closeDialog(){
    this.dS.closeDialog()
  }
}
