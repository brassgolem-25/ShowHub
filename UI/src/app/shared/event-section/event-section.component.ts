import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../types/movie';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../core/movie.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TabsComponent, RouterModule, LoadingSpinnerComponent],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent implements OnInit {
  movie: any;
  currDate:string="";
  movieTitle: string = "";
  movieCast: string = "";
  loading = true;
  date = new Date();
constructor(private route: ActivatedRoute, private mS: MovieService) { }

movieCastImg(name: string) {
  return `assets/cast/${name.toLocaleLowerCase().replace(/[ ]/g, "-")}.jpg`;
}


ngOnInit() {
  this.currDate = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`
  const movieName = this.route.snapshot.params['name'];
  const imdbID = this.route.snapshot.params['id'];
  this.mS.getMovieByID(movieName, imdbID).subscribe((movieObj: any) => {
    this.movie = movieObj[0];
    this.movieTitle = this.movie.title.replace(/[: ]+/g, "-");
    this.movieCast = this.movie.actors.split(", ");
    this.loading = false;
  })
}
}
