import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../types/movie';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [CommonModule,HeaderComponent,TabsComponent],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent implements OnInit {
  movie:Movie = 
    {
      "_id":"...",
      "title" : "Spider-Man: No Way Home",
      "year" : "2021",
      "released" : "17 Dec 2021",
      "runtime" : "148 min",
      "genre" : "Action, Adventure, Fantasy",
      "director" : "Jon Watts",
      "actors" : "Tom Holland, Zendaya, Benedict Cumberbatch",
      "plot" : "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
      "language" : "English",
      "country" : "United States",
      "poster" : "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg",
      "imdbRating" : "8.2",
      "imdbID" : "tt10872600",
      "boxOffice" : "$814,866,759",
  }
  movieTitle = this.movie.title.replace(/[: ]+/g,"-");
  movieCast = this.movie.actors.split(", ");
  movieCastImg(name  : string){
    return `assets/cast/${name.toLocaleLowerCase().replace(/[ ]/g,"-")}.jpg`;
  }

  constructor(){}
  ngOnInit(): void {
      
  }
}
