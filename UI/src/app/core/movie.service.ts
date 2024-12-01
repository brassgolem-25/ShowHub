import { Injectable } from '@angular/core';
import { Movie } from '../shared/types/movie';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieObservable:any;
  latestIMDBArr:{"imdbID":string}[]=[];
  constructor(private http:HttpClient) { 
    this.movieObservable = this.getAllMovies();
  }


  getRecommendedMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>('http://localhost:3000/api/movies/few');
  }


  getAllMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/api/movies');
  }

  getFilteredMovies(selectedLanguages:string[] | undefined,selectedGenres:string[] | undefined){
    return this.movieObservable.pipe(map((movieArr : Movie[])=>{
        return movieArr.filter((movie: Movie)=>{
          const languageArr = movie.language.split(", ");
          const genreArr = movie.genre.split(", ")
          const isLanguageSelected = selectedLanguages?.length === 0 || selectedLanguages?.some((language)=>(languageArr.includes(language))); 
          const isGenreSelected = selectedGenres?.length === 0 || selectedGenres?.some((genre)=>(genreArr.includes(genre))); 
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

  getDefaultSuggestion():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/movies/getAutoSuggestion');
  }

  getSearchSuggestion(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/movies/searchMovies',data);
  }
}
