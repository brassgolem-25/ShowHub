import { Component, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../core/dailog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../core/movie.service';
import { Movie } from '../types/movie';
import { map, timer } from 'rxjs';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RedirectService } from '../../core/redirect.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterModule, CommonModule, FontAwesomeModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, CommonModule, MatSidenavModule, MatDividerModule, MatListModule, SideNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showSideNav = false;
  myControl = new FormControl('');
  defaultOptions: Movie[] = [];
  filteredOptions: Movie[] = [];
  currLocation: string = '';
  isUserLoggedIn: boolean = false;
  constructor(private authSer: AuthService, private dialogSer: DialogService, private route: ActivatedRoute, private router: Router, private movieSer: MovieService, private redirectSer: RedirectService) {
  }

  ngOnInit() {

    this.authSer.checkAuthStatus().subscribe((response: any) => {
      this.isUserLoggedIn = response.loggedIn;
    })
    this.route.params.subscribe((params) => {
      if(params['event-location']) {
        this.currLocation = (params['event-location']).split("-")[1];
        return;
      }
      this.currLocation = params['location'] ? params['location'] : 'mumbai';
    })
    this.movieSer.getDefaultSuggestion().subscribe((movieArr: Movie[]) => {
      this.filteredOptions = movieArr.slice(0, 5)
    })
    this.myControl.valueChanges.pipe(map((value: string | any) => {
      timer(500).subscribe(() => {
        const searchQuery = value['title'] ?  value['title'] : value;
        const searchData = {
          "searchText": searchQuery
        }
        this.movieSer.getSearchSuggestion(searchData).subscribe((searchList: any) => {
          this.filteredOptions = searchList.slice(0, 5);
        })
      })
    })).subscribe()
  }

  openDialog() {
    const data = {
      "location": this.currLocation
    }
    this.dialogSer.openDialog(data);
  }

  redirect() {
    this.redirectSer.redirectToUserPage();
  }
  redirectToEventPage(option: Movie) {
    const title = option.title;
    const imdbID = option.imdbID;
    this.myControl.setValue(title)
    this.router.navigate(['/movies', this.currLocation, title, imdbID]);
  }

  parsedLocation(location: string) {
    const decodedLocation = (location.split("-").map((char: string) => char.charAt(0).toUpperCase() + char.slice(1))).join(" ");
    return decodedLocation;
  }

  toggleSideNav(event: string) {
    this.showSideNav = (event == 'close') ? false : true;
  }

  redirectToLogin() {
    const curUrl = this.router.url;
    if (!this.route.snapshot.queryParams['redirect_url']) {
      this.router.navigate(['/login'], { queryParams: { 'redirect_url': curUrl } })
    }
  }
}
