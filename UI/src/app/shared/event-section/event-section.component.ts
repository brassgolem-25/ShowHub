import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../types/movie';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { userReview } from '../types/userReview';
import { DialogService } from '../../core/dailog.service';

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
  loading = true;
  date = new Date();
  userReviews: userReview[] = [];
  constructor(private route: ActivatedRoute, private mS: MovieService,private dS:DialogService) { }

  movieCastImg(name: string) {
    return `assets/cast/${name.toLocaleLowerCase().replace(/[ ]/g, "-")}.jpg`;
  }


  ngOnInit() {
    this.currDate = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`
    const movieName = this.route.snapshot.params['name'];
    const imdbID = this.route.snapshot.params['id'];
    this.mS.getMovieByID(movieName, imdbID).subscribe((movieObj: any) => {
      this.movie = movieObj[0];
      this.userReviews = movieObj[0]['customerReview'];
      console.log(this.userReviews)
      this.movieTitle = this.movie.title.replace(/[: ]+/g, "-");
      this.movieCast = this.movie.actors.split(", ");
      this.loading = false;
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
    this.dS.openReviewDialog();
  }
}
