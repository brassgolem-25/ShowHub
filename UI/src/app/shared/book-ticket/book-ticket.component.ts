import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronLeft, faChevronRight, faInfo, faMobile, faStar } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute, Router } from '@angular/router';
import { TheatreService } from '../../core/theater.service';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ShowTimeService } from '../../core/showTime.service';
import { ShowTime } from '../types/showTime';

@Component({
  selector: 'app-book-ticket',
  standalone: true,
  imports: [HeaderComponent, TabsComponent, CommonModule, MatButtonModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatOptionModule, MatSelectModule, CommonModule, FontAwesomeModule, LoadingSpinnerComponent],
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  faStar = faStar;
  faSearch = faSearch;
  faChevronLeft = faChevronLeft
  faChevronRight = faChevronRight;
  faInfo = faInfo;
  faMobile = faMobile;
  currDate: string = "";
  dates: string[] = [];
  movieGenre:String[]=[];
  movieName: string = '';
  movieLanguage: string = '';
  imdbID: string = '';
  currLocation: string = '';
  selectedDate: string = '';
  movie: any;
  loading: boolean = true;
  showTimeArr:any;

  constructor(private route: ActivatedRoute, private theatreSer: TheatreService, private mS: MovieService, private showTimeSer: ShowTimeService, private router: Router) {
    const currDateArr = Date().slice(0, 15).split(" "); //[Mon,04,Nov,2024]
    let curDate = Number(currDateArr[2]);
    this.dates.push(currDateArr[0] + " " + curDate + " " + currDateArr[1]);
    for (let i = 1; i < 7; i++) {
      curDate = curDate + 1;
      this.dates.push(currDateArr[0] + " " + curDate + " " + currDateArr[1]);
    }
  }



  theaters: any;

  // Method to change selected date
  selectDate(date: any) {
    this.selectedDate = this.formattedDate(date);
    this.router.navigate([], { relativeTo: this.route, queryParams: { date: this.selectedDate } })
    const data = {
      "imdbID": this.imdbID,
      "location": this.currLocation
    }
    this.getTheaterShowTimeDetails(data);
  }

  formattedDate(date: string) {
    const currYear = (new Date()).getFullYear();
    const dateObj = new Date(date + currYear);
    return `${dateObj.getFullYear()}${dateObj.getMonth() + 1}${dateObj.getDate()}`;
  }


  ngOnInit() {

    this.imdbID = this.route.snapshot.params['id'];
    this.movieName = this.route.snapshot.params['eventName'];
    this.route.params.subscribe((data) => {
      this.currLocation = data['location'];
    })
    const data = {
      "imdbID": this.imdbID,
      "location": this.currLocation
    }
    this.getTheaterShowTimeDetails(data);
    this.route.queryParams.subscribe((data) => {
      this.selectedDate = data['date'];
    })


  }

  getTheaterShowTimeDetails(data: { imdbID: string; location: string }){
    this.theatreSer.getTheatreDetails(data).subscribe((theaters) => {
      this.theaters = theaters;
      this.mS.getMovieByID(this.movieName, this.imdbID).subscribe((movieData: any) => {
        this.movie = movieData;
        this.movieGenre = movieData['genre'].split(",");
        this.movieLanguage=movieData['language']
        this.theaters.forEach((theater:any,index:number)=>{
          const req = {
            "imdbID": this.imdbID,
            "theatreID": theater['theatreID'],
            "date": this.selectedDate
          }
          this.showTimeSer.getShowTimeDetails(req).subscribe((showTimeRes:ShowTime)=>{
            this.showTimeArr=showTimeRes;
            this.theaters[index].showTimes = this.showTimeArr[0]['showtimes'];
          })
        })
        this.loading = false;
      })
    })
  }

}
