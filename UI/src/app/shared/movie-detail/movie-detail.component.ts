import { Component, OnInit } from '@angular/core';
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/movie.service';
import { Movie } from '../types/movie';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [GenericHeaderComponent, CommonModule, LoadingSpinnerComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  clicked:boolean=false;
  selectedLanguages: string[] = [];
  selectedGenres: string[] = [];
  selectedFormats: string[] = [];
  filteredMovies: Movie[] = [];

  constructor(private ms: MovieService) {

    ms.getAllMovies().subscribe((moviesArr: Movie[]) => {
      this.movies = moviesArr;
      this.loading = false;
    })

  }

  languages: string[] = [
    'Hindi', 'English', 'Marathi', 'Gujarati',
    'Malayalam', 'Multi Language', 'Bengali',
    'Japanese', 'Odia', 'Tamil'
  ];

  // Temporary array for Genres
  genres: string[] = [
    'Drama', 'Thriller', 'Action', 'Comedy',
    'Horror', 'Adventure', 'Family', 'Crime',
    'Romantic', 'Suspense', 'Animation', 'Period',
    'Biography', 'Mystery', 'Sci-Fi', 'Anime',
    'Classic', 'Fantasy', 'Political', 'Supernatural'
  ];

  // Temporary array for Formats
  formats: string[] = [
    '2D', '3D', '4DX 3D', 'MX4D 3D',
    '3D SCREEN X', 'IMAX 2D', 'IMAX 3D'
  ];

  toggleLanguage(language:string){
    if(this.selectedLanguages.includes(language)){
      this.selectedLanguages.splice(this.selectedLanguages.indexOf(language),1);
    }else {
      this.selectedLanguages.push(language);
    }
  }

  toggleGenre(genre:string){
    if(this.selectedGenres.includes(genre)){
      this.selectedGenres.splice(this.selectedGenres.indexOf(genre),1)
    }else {
      this.selectedGenres.push(genre);
    }
  }
  
  clearFilter(filterType:string){
    if(filterType == 'langugae') {this.selectedLanguages = [];}
    else if(filterType == 'format') {this.selectedFormats = []}
    else {this.selectedGenres = []}
  
  }

  toggleFormat(format:string){
    //later on
  }


  ngOnInit(): void {

  }
}
