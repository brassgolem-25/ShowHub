import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MovieService } from '../../core/movie.service';
import { Movie } from '../types/movie';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LiveEventService } from '../../core/live-events.service';
import { LiveEvents } from '../types/liveEvent';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { TheatreService } from '../../core/theater.service';
@Component({
  selector: 'app-recommended-ent',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule, RouterLink, MatIconModule, LoadingSpinnerComponent, FontAwesomeModule],
  templateUrl: './recommended-ent.component.html',
  styleUrl: './recommended-ent.component.css'
})

export class RecommendedEntComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  currLocation: string = "";
  loading: boolean = true;
  currentPage:any = {
    "movie":0,
    "liveEvent":0
  };
  itemsPerPage = 5;
  movies: Movie[] = [];
  events: Movie[] = [
    {
      "_id": "671e7e8908b9101cd2203313",
      "title": "Spider-Man: No Way Home",
      "year": "2021",
      "released": "17 Dec 2021",
      "runtime": "148 min",
      "genre": "Action, Adventure, Fantasy",
      "director": "Jon Watts",
      "actors": "Tom Holland, Zendaya, Benedict Cumberbatch",
      "plot": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
      "language": "English",
      "country": "United States",
      "poster": "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg",
      "imdbRating": "8.2",
      "imdbID": "tt10872600",
      "boxOffice": "$814,866,759",
    },
    {
      "_id": "671e9b7b08b9101cd2203318",
      "title": "Fight Club",
      "year": "1999",
      "released": "15 Oct 1999",
      "runtime": "139 min",
      "genre": "Drama",
      "director": "David Fincher",
      "actors": "Brad Pitt, Edward Norton, Meat Loaf",
      "plot": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      "language": "English",
      "country": "Germany, United States",
      "poster": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
      "imdbRating": "8.8",
      "imdbID": "tt0137523",
      "boxOffice": "$37,030,102",
    },
    {
      "_id": "671e9bfb08b9101cd220331a",
      "title": "Inception",
      "year": "2010",
      "released": "16 Jul 2010",
      "runtime": "148 min",
      "genre": "Action, Adventure, Sci-Fi",
      "director": "Christopher Nolan",
      "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
      "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      "language": "English, Japanese, French",
      "country": "United States, United Kingdom",
      "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      "imdbRating": "8.8",
      "imdbID": "tt1375666",
      "boxOffice": "$292,587,330",
    },
    {
      "_id": "671e9cc608b9101cd220331d",
      "title": "Interstellar",
      "year": "2014",
      "released": "07 Nov 2014",
      "runtime": "169 min",
      "genre": "Adventure, Drama, Sci-Fi",
      "director": "Christopher Nolan",
      "actors": "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      "plot": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      "language": "English",
      "country": "United States, United Kingdom, Canada",
      "poster": "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
      "imdbRating": "8.7",
      "imdbID": "tt0816692",
      "boxOffice": "$188,020,017",
    },
    {
      "_id": "671e9d3b08b9101cd220331f",
      "title": "Spirited Away",
      "year": "2001",
      "released": "28 Mar 2003",
      "runtime": "124 min",
      "genre": "Animation, Adventure, Family",
      "director": "Hayao Miyazaki",
      "actors": "Daveigh Chase, Suzanne Pleshette, Miyu Irino",
      "plot": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.",
      "language": "Japanese",
      "country": "Japan, United States",
      "poster": "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_SX300.jpg",
      "imdbRating": "8.6",
      "imdbID": "tt0245429",
      "boxOffice": "$15,205,725",
    }

  ]
  liveEvents: LiveEvents[] = [];
  gameEvents = this.events;
  funEvents = this.events;
  contentType='liveEvents';

  constructor(private mS: MovieService,private theaterSer: TheatreService,private liveEventSer: LiveEventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currLocation = params['location'];
      console.log(this.currLocation)
      if (this.currLocation.includes('delhi')) {
        this.currLocation = 'Delhi'
      }
    })
    const data = {
      "city": this.currLocation,
    }
    this.liveEventSer.getBasicLiveEventsByLocation(data).subscribe((events: LiveEvents[]) => {
      this.liveEvents = events;
    })

    this.theaterSer.getCurrentlyRunningMovie({"city":this.currLocation,"limit":10}).subscribe((moviesArr:any)=>{
      this.movies = moviesArr;
      this.loading = false;
    })
  }

  redirectToMoviePage(title: string, imdbID: string) {
    this.router.navigate(['/movies', this.currLocation, title, imdbID])
  }

  parsedDate(date: string) {
    let dateString = (new Date(date)).toDateString();
    if (dateString === 'Invalid Date') {
      const dateParts = date.split("-");
      dateString = (new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)).toDateString();
    }
    return dateString;
  }

  redirectToEventPage(event: LiveEvents) {
    const name = (event.title).toLowerCase().split(" ").join("-");
    console.log(this.currLocation, name, event.event_code)
    this.router.navigate(['/events', this.currLocation, name, event.event_code])
  }

  get paginatedEvents() {
    const startIndex = this.currentPage['liveEvent'] * this.itemsPerPage;
    return this.liveEvents.slice(startIndex, this.itemsPerPage + startIndex);
  }

  get paginatedMovies(){
    const startIndex = this.currentPage['movie'] * this.itemsPerPage;
    return this.movies.slice(startIndex, this.itemsPerPage + startIndex);
  }


  nextPage(eventType:string) {
    if (this.currentPage[eventType] === 0) {
      this.currentPage[eventType]++;
    }
  }

  prevPage(eventType:string) {
    if (this.currentPage[eventType] > 0) {
      this.currentPage[eventType]--;
    }
  }
}
