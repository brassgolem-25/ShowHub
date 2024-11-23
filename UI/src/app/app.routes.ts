import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MovieDetailComponent } from './shared/movie-detail/movie-detail.component';
import { EventSectionComponent } from './shared/event-section/event-section.component';
import { BookTicketComponent } from './shared/book-ticket/book-ticket.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { SeatSelectionComponent } from './shared/seat-selection/seat-selection.component';
import { MovieSectionComponent } from './shared/movie-section/movie-section.component';

export const routes: Routes = [
    {path:'explore/home/:location',component:HomeComponent},
    {path:'explore/movies/:location',component:MovieDetailComponent},
    {path:'movies/:location/:name/:id',component:MovieSectionComponent},
    {path:'events/:location/:name/:eventCode',component:EventSectionComponent},
    {path:'buytickets/:location/:eventName/:id',component:BookTicketComponent},
    {path:'user-profile',component:UserProfileComponent},
    {path:'seat',component:SeatSelectionComponent},
    {path:'signIn',component:SignInComponent},
    {path:'login',component:SignInComponent},
    {path:'**',redirectTo:'explore/home/Mumbai',pathMatch:'full'}
];
