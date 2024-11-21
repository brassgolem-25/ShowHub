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
  selector: 'app-event-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TabsComponent, RouterModule, LoadingSpinnerComponent, FontAwesomeModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent implements OnInit {
  faStar = faStar;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  movie: any;
  currDate: string = "";
  movieTitle: string = "";
  movieCast: string = "";
  imdbID:string="";
  loading = true;
  date = new Date();
  userReviews: userReview[] = [];
  userEmail:string='';
  currLocation:string='';
  constructor(private route: ActivatedRoute, private router: Router,private mS: MovieService,private dS:DialogService,private authSer:AuthService) { }

  movieCastImg(name: string) {
    return `assets/cast/${name.toLocaleLowerCase().replace(/[ ]/g, "-")}.jpg`;
  }


  ngOnInit() {
    this.currDate = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`
    const movieName = this.route.snapshot.params['name'];
    this.imdbID = this.route.snapshot.params['id'];
    this.mS.getMovieByID(movieName, this.imdbID).subscribe((movieObj: any) => {
      this.movie = movieObj;
      this.userReviews = movieObj['customerReview'];
      this.movieTitle = this.movie.title.replace(/[: ]+/g, "-");
      this.movieCast = this.movie.actors.split(", ");
      this.loading = false;
    })

    this.authSer.checkAuthStatus().subscribe((res)=>{
      this.userEmail = res['loggedIn'] ? res['user']['data'] : '' ;
      console.log(this.userEmail);
    })

    this.route.params.subscribe((params)=>{
      this.currLocation = params['location'] ? params['location'] : 'Mumbai';
  })
  }

  reviewTags = [
    { name: '#SuperDirection', count: 944 },
    { name: '#GreatActing', count: 943 },
    { name: '#AwesomeStory', count: 813 },
    { name: '#Wellmade', count: 786 },
    { name: '#Inspiring', count: 782 }
  ];

  reviews = [
    {
      user: 'User1',
      comment: 'हर हिन्दू को देखनी चाहिए - कांग्रेस और वामपंथी और मुल्ले किस तरह साजिश करते हैं',
      rating: 10,
      likes: 324,
      dislikes: 10,
      timeAgo: '20 hours ago'
    },
    {
      user: 'San',
      comment: "Vikrant has done his best work but the story doesn't tell the truth. It's a modified story to make the wrong people a hero. Manipulated story.",
      rating: 1,
      likes: 163,
      dislikes: 20,
      timeAgo: '20 hours ago'
    }
  ];
  openReviewDialog(){

    const movieData = {
      imdbID:this.imdbID,
      userEmail:this.userEmail
    }
    this.dS.openReviewDialog(movieData);
  }

  redirectToBooking(){
    // [routerLink]="['/buytickets', currLocation,movie.title,imdbID]" 
    this.router.navigate(['/buyTickets',this.currLocation,this.movie.title,this.imdbID],{
      queryParams :{
        date : this.currDate
      }
    })
  }
}
