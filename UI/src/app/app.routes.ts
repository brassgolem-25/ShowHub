import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MovieDetailComponent } from './shared/movie-detail/movie-detail.component';
import { EventSectionComponent } from './shared/event-section/event-section.component';
import { BookTicketComponent } from './shared/book-ticket/book-ticket.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';

export const routes: Routes = [
    {path:'explore/home',component:HomeComponent},
    {path:'explore/movies',component:MovieDetailComponent},
    {path:'movies/:name/:id',component:EventSectionComponent},
    {path:'buytickets/:eventName/:date',component:BookTicketComponent},
    {path:'signIn',component:SignInComponent},
    {path:'login',component:SignInComponent},
    {path:'**',redirectTo:'explore/home',pathMatch:'full'}
];
