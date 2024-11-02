import { Injectable } from '@angular/core';
import { Movie } from '../shared/types/movie';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieObservable:any;
  constructor(private http:HttpClient) { 
    this.movieObservable = this.getAllMovies();
  }


  getRecommendedMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>('http://localhost:3000/api/movies/few');
  }

  getAllMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/api/movies/all');
  }

  getFilteredMovies(selectedLanguages:string[],selectedGenres:string[]){
  }
}
