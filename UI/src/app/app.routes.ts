import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MovieDetailComponent } from './shared/movie-detail/movie-detail.component';

export const routes: Routes = [
    {path:'explore/home',component:HomeComponent},
    {path:'explore/movies',component:MovieDetailComponent},
    {path:'**',redirectTo:'explore/home',pathMatch:'full'}
];
