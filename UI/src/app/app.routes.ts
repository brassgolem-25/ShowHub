import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MovieDetailComponent } from './shared/movie-detail/movie-detail.component';
import { EventSectionComponent } from './shared/event-section/event-section.component';
import { BookTicketComponent } from './shared/book-ticket/book-ticket.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { SeatSelectionComponent } from './shared/seat-selection/seat-selection.component';
import { MovieSectionComponent } from './shared/movie-section/movie-section.component';
import { AuthGaurd } from './core/auth-gaurd.service';
import { LocationGuard } from './core/location-guard.service';

export const routes: Routes = [
    {path:'explore/home/:location',component:HomeComponent,canActivate:[LocationGuard]},
    {path:'explore/movies/:location',component:MovieDetailComponent,canActivate:[LocationGuard]},
    {path:'movies/:location/:name/:id',component:MovieSectionComponent,canActivate:[LocationGuard]},
    {path:'events/:location/:name/:eventCode',component:EventSectionComponent,canActivate:[LocationGuard]},
    {path:'buytickets/:location/:eventName/:id',component:BookTicketComponent,canActivate:[LocationGuard]},
    {path:'user-profile',component:UserProfileComponent},
    {path:'seat',component:SeatSelectionComponent},
    {path:'signIn',component:SignInComponent,canActivate:[AuthGaurd]},
    {path:'login',component:SignInComponent,canActivate:[AuthGaurd]},
    {path:'**',redirectTo:'explore/home/mumbai',pathMatch:'full'}
];
