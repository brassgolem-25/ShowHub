import { Component, OnInit } from '@angular/core';
import { RecommendedEntComponent } from "../recommended-ent/recommended-ent.component";
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecommendedEntComponent, GenericHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(){}

  ngOnInit() {

  }
}
