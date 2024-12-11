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
  movieGenre: String[] = [];
  movieName: string = '';
  movieLanguage: string = '';
  imdbID: string = '';
  currLocation: string = '';
  selectedDate: string = '';
  loading: boolean = true;
  theater_showtime_movie_detail: any;
  data: { imdbID: string, city: string, date: string } = {
    "imdbID": "",
    "city": "",
    "date": ""
  }

  constructor(private route: ActivatedRoute, private theatreSer: TheatreService, private mS: MovieService, private showTimeSer: ShowTimeService, private router: Router) {
    const currDateArr = Date().slice(0, 15).split(" "); //[Mon,04,Nov,2024]
    let curDate = Number(currDateArr[2]);
    this.dates.push(currDateArr[0] + " " + curDate + " " + currDateArr[1]);
    for (let i = 1; i < 7; i++) {
      curDate = curDate + 1;
      this.dates.push(currDateArr[0] + " " + curDate + " " + currDateArr[1]);
    }
  }




  // Method to change selected date
  selectDate(date: any) {
    this.selectedDate = this.formattedDate(date);
    this.router.navigate([
      '/buytickets',
      this.currLocation,
      this.movieName,
      this.imdbID,
      this.selectedDate
    ])
    this.data.date = this.selectedDate;
    this.loading = true;
    this.getTheaterShowTimeDetails(this.data);
  }

  formattedDate(date: string) {
    const currYear = (new Date()).getFullYear();
    const dateObj = new Date(date + currYear);
    return `${dateObj.getFullYear()}${dateObj.getMonth() + 1}${dateObj.getDate()}`;
  }


  ngOnInit() {

    this.route.params.subscribe((data) => {
      this.imdbID = data['id'],
        this.movieName = data['eventName']
      this.currLocation = data['location'];
      this.selectedDate = data['date']
      this.data.imdbID = this.imdbID,
        this.data.city = this.currLocation
      this.data.date = this.selectedDate;
    })

    this.getTheaterShowTimeDetails(this.data);

  }

  getTheaterShowTimeDetails(data: { imdbID: string; city: string, date: string }) {

    this.showTimeSer.getShowTimeDetails(data).subscribe((response: { status: string, result: any }) => {
      if (response.status == 'success') {
        this.theater_showtime_movie_detail = response.result.theater_showtime;
        this.movieName = response.result.movieDetails.title;
        this.movieGenre = response.result.movieDetails.genre.split(", ");
        this.movieLanguage = response.result.movieDetails.language;
        this.loading = false;
      }
    })
  }

}
