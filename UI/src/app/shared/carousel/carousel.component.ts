import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatTabsModule,MatCardModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

}
