import { CommonModule } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { faSearch,faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../../core/dailog.service';

@Component({
  selector: 'app-location-dialog',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,CommonModule,FontAwesomeModule],
  templateUrl: './location-dialog.component.html',
  styleUrl: './location-dialog.component.css'
})
export class LocationDialogComponent implements OnInit {
  currLocation:string='';
  constructor(private router:Router,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data:any,public dS:DialogService){
    this.currLocation = data['location'];
  }
  faSearch=faSearch;
  faLocationCrosshairs=faLocationCrosshairs;
  popularCities = [
    { name: 'Mumbai', icon: 'assets/landmark/mumbai.png' },
    { name: 'Delhi-NCR', icon: 'assets/landmark/delhi.png' },
    { name: 'Bengaluru', icon: 'assets/landmark/bengaluru.png' },
    { name: 'Hyderabad', icon: 'assets/landmark/hyderabad.png' },
    { name: 'Ahmedabad', icon: 'assets/landmark/ahmedabad.png' },
    { name: 'Chandigarh', icon: 'assets/landmark/chandigarh.png' },
    { name: 'Chennai', icon: 'assets/landmark/chennai.png' },
    { name: 'Pune', icon: 'assets/landmark/pune.png' },
    { name: 'Kolkata', icon: 'assets/landmark/kolkata.png' },
    { name: 'Kochi', icon: 'assets/landmark/kochi.png' },
  ];

  selectedLocation(location:string){
    let urlSegment = decodeURIComponent(this.router.url).split('/');
    const index = urlSegment.indexOf(this.currLocation);
    urlSegment[index] = location;
    const newUrlSegment = urlSegment.splice(1);
    this.router.navigate(newUrlSegment,{replaceUrl:true});
    this.dS.closeDialog()
  }
  ngOnInit(): void {
  }
}
