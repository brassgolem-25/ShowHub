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

  getFilteredMovies(selectedLanguages:string[] | undefined,selectedGenres:string[] | undefined){
    return this.movieObservable.pipe(map((movieArr : Movie[])=>{
        return movieArr.filter((movie: Movie)=>{
          const isLanguageSelected = selectedLanguages?.length === 0 || selectedLanguages?.includes(movie.language); 
          const isGenreSelected = selectedGenres?.length === 0 || selectedGenres?.includes(movie.genre); 
          return isLanguageSelected && isGenreSelected;
        })
    }))
  }

  getMovieByID(movieName:string,imdbID:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`http://localhost:3000/api/movies/movieDetails/${movieName}/${imdbID}`);
  }

  updateCustomerRating(reviewData:{}):Observable<any>{
    return this.http.post('http://localhost:3000/api/movies/addCustomerReview',reviewData)
  }
}
