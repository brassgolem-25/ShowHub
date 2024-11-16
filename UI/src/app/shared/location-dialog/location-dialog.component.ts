import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { faSearch,faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-dialog',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,CommonModule,FontAwesomeModule],
  templateUrl: './location-dialog.component.html',
  styleUrl: './location-dialog.component.css'
})
export class LocationDialogComponent {
  constructor(private router:Router){}
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
    this.router.navigate(['explore','home',location]);
  }
}
