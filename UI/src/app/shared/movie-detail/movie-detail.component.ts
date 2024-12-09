import { Component, OnInit } from '@angular/core';
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/movie.service';
import { Movie } from '../types/movie';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TheatreService } from '../../core/theater.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [GenericHeaderComponent, CommonModule, LoadingSpinnerComponent,RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  clicked: boolean = false;
  selectedLanguages: string[] = [];
  selectedGenres: string[] = [];
  selectedFormats: string[] = [];
  filteredMovies: Movie[] = [];
  currLocation:string="";
  constructor(private mS: MovieService,private theaterSer: TheatreService, private route: ActivatedRoute, private router: Router) {
    // mS.getAllMovies().subscribe((moviesArr: Movie[]) => {
    //   console.log(moviesArr)
    //   this.movies = moviesArr;
    //   this.loading = false;
    // })
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


  //refactor the code later
  toggleLanguage(language: string) {

    if (this.selectedLanguages.includes(language)) {
      this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
    } else {
      this.selectedLanguages.push(language);
    }
    const languageQuery = this.selectedLanguages.join(',');
    if (this.selectedLanguages.length > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { languages: languageQuery },
        queryParamsHandling: 'merge'
      })
    }else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { languages: null },
        queryParamsHandling: 'merge'
      })
    }
  }

  toggleGenre(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres.splice(this.selectedGenres.indexOf(genre), 1)
    } else {
      this.selectedGenres.push(genre);
    }
    const genreQuery = this.selectedGenres.join(',');
    if (this.selectedGenres.length > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { genre: genreQuery },
        queryParamsHandling: 'merge'
      })
    }else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { genre: null },
        queryParamsHandling: 'merge'
      })
    }
  }

  clearFilter(filterType: string) {
    if (filterType == 'language') {
      this.selectedLanguages = [];
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { languages: null },
        queryParamsHandling: 'merge'
      })
    }
    else if (filterType == 'format') {
      //handdle later
    }
    else {
      this.selectedGenres = []

      this.selectedFormats = []
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { genre: null },
        queryParamsHandling: 'merge'
      })

    }

  }

  toggleFormat(format: string) {
    //later on
  }


  ngOnInit() {

    this.route.params.subscribe(params=>{
      this.currLocation = params['location'];
    })

    // route handling for persistent changes even after refreshing the URL
    this.route.queryParamMap.subscribe(params => {
      const languageQuery = params.get('languages')?.split(',') ?? [];
      const genreQuery = params.get('genre')?.split(',') ?? [];
      this.loading = true;
      this.mS.getFilteredMovies(languageQuery, genreQuery).subscribe((data: any) => {
        this.movies = data;
        this.loading = false;
      })

      this.selectedLanguages = languageQuery ? languageQuery : [];
      this.selectedGenres = genreQuery ? genreQuery : [];

    })
    
    this.theaterSer.getCurrentlyRunningMovie({"city":this.currLocation,"limit":null}).subscribe((moviesArr:any)=>{
      this.movies = moviesArr;
        this.loading = false;
    })

  }
}
