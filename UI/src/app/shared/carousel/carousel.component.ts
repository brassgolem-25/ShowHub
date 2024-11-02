import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatTabsModule,MatCardModule,MatIconModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  currentSlide: number = 0;

  slides = [
    { img: 'assets/movie2.jpg', alt: 'First Slide' },
    { img: 'assets/movie2.jpg', alt: 'Second Slide' }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
