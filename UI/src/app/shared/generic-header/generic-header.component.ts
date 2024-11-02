import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-generic-header',
  standalone: true,
  imports: [HeaderComponent, TabsComponent, CarouselComponent],
  templateUrl: './generic-header.component.html',
  styleUrl: './generic-header.component.css'
})
export class GenericHeaderComponent {

}
