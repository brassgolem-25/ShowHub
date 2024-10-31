import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-material-module',
  standalone: true,
  imports: [MatTabsModule,MatToolbarModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './material-module.component.html',
  styleUrl: './material-module.component.css'
})
export class MaterialModuleComponent {

}
