import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronLeft, faChevronRight, faInfo, faMobile, faStar, faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { TheatreService } from '../../core/theater.service';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ShowTimeService } from '../../core/showTime.service';

@Component({
  selector: 'app-book-ticket',
  standalone: true,
  imports: [
    HeaderComponent,
    TabsComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FontAwesomeModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  // FontAwesome Icons
  faStar = faStar;
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faInfo = faInfo;
  faMobile = faMobile;
  faBowlFood = faBowlFood;

  // Component State
  currentDate: string = "";
  dateList: { display: string, raw: string }[] = [];
  movieGenres: string[] = [];
  movieTitle: string = '';
  movieLanguage: string = '';
  imdbId: string = '';
  currentCity: string = '';
  selectedDate: string = '';
  isLoading: boolean = true;

  // Theater and Show Details
  originalTheaterShowDetails: any;
  filteredTheaterShowDetails: any;
  showTimeDetails: any;

  // Filters Form
  filterForm = new FormGroup({
    formatFilter: new FormControl(),
    priceFilter: new FormControl(),
  });

  // Data for API Requests
  requestData = {
    imdbID: '',
    city: '',
    date: ''
  };

  constructor(
    private route: ActivatedRoute,
    private theaterService: TheatreService,
    private movieService: MovieService,
    private showTimeService: ShowTimeService,
    private router: Router
  ) {
    this.initializeDates();
  }

  ngOnInit(): void {
    this.initializeRouteConfig();
    this.fetchTheaterShowDetails(this.requestData);
    this.initializeFilterForm();
  }

  // Initialize Date List
  private initializeDates(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      this.currentDate = this.formatToYYYYMMDD(date);
      date.setDate(today.getDate() + i);
      this.dateList.push({
        display: this.formatDisplayDate(date), // For UI display
        raw: this.formatToYYYYMMDD(date), // For comparisons
      });
    }
  }
  // Format Date Helper
  private formatDisplayDate(inpDate: Date): string {
    const day = inpDate.toLocaleString('en-us', { weekday: 'short' });
    const month = inpDate.toLocaleString('en-us', { month: 'short' });
    return `${day} ${inpDate.getDate()} ${month}`;
  }

  private formatToYYYYMMDD(dateObj: Date): string {
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // Handle Date Selection
  onDateSelect(dateObj:{ display: string, raw: string }): void {
    this.selectedDate = dateObj.raw;
    this.updateRoute();
    this.requestData.date = this.selectedDate;
    this.isLoading = true;
    this.fetchTheaterShowDetails(this.requestData);
  }

  // Fetch Theater and Show Details
  private fetchTheaterShowDetails(data: { imdbID: string; city: string; date: string }): void {
    this.showTimeService.getShowTimeDetails(data).subscribe((response: { status: string; result: any }) => {
      if (response.status === 'success') {
        this.originalTheaterShowDetails = response.result.theater_showtime;
        this.filteredTheaterShowDetails = response.result.theater_showtime;
        this.movieTitle = response.result.movieDetails.title;
        this.movieGenres = response.result.movieDetails.genre.split(', ');
        this.movieLanguage = response.result.movieDetails.language;
        this.showTimeDetails = response.result.showTime_Lang_Format;
        this.filterForm.patchValue({
          formatFilter: this.showTimeDetails[0],
          priceFilter: '101-200'
        });
        this.isLoading = false;
      }
    });
  }

  private validateDate(inpDate:string):boolean{
    const inpDay = inpDate.slice(6,8);
    const currDay = this.currentDate.slice(6,8);
    if(inpDay<currDay){
      return false;
    }
    return true;
  }

  // Initialize Route Configuration
  private initializeRouteConfig(): void {
    const params = this.route.snapshot.params;
    this.imdbId = params['id'];
    this.movieTitle = params['eventName'];
    this.currentCity = params['location'];
    this.selectedDate = params['date'];
    if(!this.validateDate(this.selectedDate)){
      this.selectedDate=this.currentDate
      this.updateRoute();
    }
    this.requestData = {
      imdbID: this.imdbId,
      city: this.currentCity,
      date: this.selectedDate
    };
  }

  // Update Route
  private updateRoute(): void {
    this.router.navigate(['/buytickets', this.currentCity, this.movieTitle, this.imdbId, this.selectedDate]);
  }

  // Initialize Filter Form Behavior
  private initializeFilterForm(): void {
    this.filterForm.valueChanges.subscribe(filters => {
      const [language, format] = (filters.formatFilter || '').split(' - ');
      const [startPrice, endPrice] = (filters.priceFilter || '').split('-').map(Number);
      this.filteredTheaterShowDetails = this.originalTheaterShowDetails.map((theater: any) => {
        return {
          ...theater,
          showTime: theater.showTime.filter((show: any) => {
            return (
              show.format === format &&
              show.language === language &&
              show.price >= startPrice &&
              show.price <= endPrice
            );
          })
        };
      });
    });
  }

  // Navigate to Previous Date
  onPreviousDate(): void {
    // const currentIndex = this.dateList.indexOf(this.selectedDate);
    // if (currentIndex > 0) {
    //   this.selectedDate = this.dateList[currentIndex - 1];
    //   this.onDateSelect(this.selectedDate);
    // }
  }

  // Navigate to Next Date
  onNextDate(): void {
    // const currentIndex = this.dateList.indexOf(this.selectedDate);
    // if (currentIndex < this.dateList.length - 1) {
    //   this.selectedDate = this.dateList[currentIndex + 1];
    //   this.onDateSelect(this.selectedDate);
    // }
  }

  // Get Icon for Amenities
  getAmenityIcon(amenity: string): any {
    return amenity.includes('M-Ticket') ? this.faMobile : this.faBowlFood;
  }
}