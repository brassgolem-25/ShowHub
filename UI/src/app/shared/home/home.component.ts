import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from '../tabs/tabs.component';
import { RecommendedEntComponent } from "../recommended-ent/recommended-ent.component";
import { MovieService } from '../../core/movie.service';
import { CarouselComponent } from "../carousel/carousel.component";
import { GenericHeaderComponent } from "../generic-header/generic-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecommendedEntComponent, GenericHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private mS: MovieService){}

  ngOnInit() {
  }
}
