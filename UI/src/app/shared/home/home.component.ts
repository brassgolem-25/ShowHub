import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from '../tabs/tabs.component';
import { RecommendedEntComponent } from "../recommended-ent/recommended-ent.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TabsComponent, RecommendedEntComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
