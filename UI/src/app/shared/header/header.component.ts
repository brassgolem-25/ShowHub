import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../core/dailog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/movie.service';
import { Movie } from '../types/movie';
import {  map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterModule,CommonModule,FontAwesomeModule,MatAutocompleteModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  myControl = new FormControl('');
  defaultOptions:Movie[]=[];
  filteredOptions:Movie[]=[];
  currLocation:string = '';
  isUserLoggedIn:boolean = false;
  constructor(private authSer: AuthService,private dialogSer: DialogService,private route:ActivatedRoute,private router:Router,private movieSer:MovieService) { 
  }
  
  ngOnInit() {
    this.authSer.checkAuthStatus().subscribe((response:any)=>{
      this.isUserLoggedIn = response.loggedIn;
    })
    this.route.params.subscribe((params)=>{
        this.currLocation = params['location'] ? params['location'] : 'Mumbai';
    })
    this.movieSer.getDefaultSuggestion().subscribe((movieArr:Movie[])=>{
      this.defaultOptions = movieArr
      this.filteredOptions = movieArr
    })
     this.myControl.valueChanges.pipe(map( (value:any) => {
      const filterValue = value.toLowerCase()
      this.filteredOptions =  this.defaultOptions.filter(movie =>movie['title'].toLowerCase().includes(filterValue));
    })).subscribe()

  }


  openDialog(){
    const data = {
      "location":this.currLocation
    }
    this.dialogSer.openDialog(data);
  }

  redirectToUserPage(){
    this.router.navigate(['/user-profile'])
  }
  redirectToEventPage(option:Movie){
    const title = option.title;
    const imdbID = option.imdbID;
    this.router.navigate(['/movies',this.currLocation,title,imdbID])
  }
}
