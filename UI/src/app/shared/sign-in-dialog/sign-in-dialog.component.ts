import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { faMobileAlt, faTimes } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [MatButtonModule,FontAwesomeModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css'
})
export class SignInDialogComponent {
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  faApple = faApple;
  faMobileAlt = faMobileAlt;
  faClose = faTimes;
  
  constructor(private dialog:MatDialog){}

  closeDialog(){
    this.dialog.closeAll()
  }
}
