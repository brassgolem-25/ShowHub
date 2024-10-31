import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recommended-ent',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './recommended-ent.component.html',
  styleUrl: './recommended-ent.component.css'
})
export class RecommendedEntComponent {

}
