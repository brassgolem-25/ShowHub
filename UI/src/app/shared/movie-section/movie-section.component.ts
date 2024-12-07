import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../types/movie';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { userReview } from '../types/userReview';
import { DialogService } from '../../core/dailog.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TabsComponent, RouterModule, LoadingSpinnerComponent, FontAwesomeModule],
  templateUrl: './movie-section.component.html',
  styleUrl: './movie-section.component.css'
})

export class MovieSectionComponent implements OnInit {
  faStar = faStar;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  movie: any;
  movieName:string="";
  currDate: string = "";
  movieTitle: string = "";
  movieCast: string = "";
  imdbID: string = "";
  loading = true;
  date = new Date();
  userReviews: userReview[] = [];
  userEmail: string = '';
  currLocation: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private mS: MovieService, private dS: DialogService, private authSer: AuthService) { }

  movieCastImg(name: string) {
    return `assets/cast/${name.toLocaleLowerCase().replace(/[ ]/g, "-")}.jpg`;
  }


  ngOnInit() {
    this.currDate = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`

    this.authSer.checkAuthStatus().subscribe((res) => {
      this.userEmail = res['loggedIn'] ? res['user']['data'] : '';
    })

    this.route.paramMap.subscribe((params: any) => {
      this.movieName = params.get('name');
      this.currLocation = params.get('location') ? params.get('location') : 'Mumbai';
      this.imdbID = params.get('id');
      this.loadMovieObj();
    })
  }

  reviewTags = [
    { name: '#SuperDirection', count: 944 },
    { name: '#GreatActing', count: 943 },
    { name: '#AwesomeStory', count: 813 },
    { name: '#Wellmade', count: 786 },
    { name: '#Inspiring', count: 782 }
  ];

  openReviewDialog() {

    const movieData = {
      imdbID: this.imdbID,
      userEmail: this.userEmail
    }
    this.dS.openReviewDialog(movieData);
  }

  redirectToBooking() {
    // [routerLink]="['/buytickets', currLocation,movie.title,imdbID]" 
    this.router.navigate(['/buyTickets', this.currLocation, this.movie.title, this.imdbID], {
      queryParams: {
        date: this.currDate
      }
    })
  }

  loadMovieObj() {
    this.mS.getMovieByID(this.movieName, this.imdbID).subscribe((movieObj: any) => {
      this.movie = movieObj;
      this.userReviews = movieObj['customerReview'];
      this.movieTitle = this.movie.title.replace(/[: ]+/g, "-");
      this.movieCast = this.movie.actors.split(", ");
      this.loading = false;
    })
  }
}

