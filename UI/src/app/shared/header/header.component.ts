import { Component, OnInit,ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../core/dailog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterModule,CommonModule,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currLocation:string = '';
  isUserLoggedIn:boolean = false;
  constructor(private authSer: AuthService,private dialogSer: DialogService,private route:ActivatedRoute,private router:Router) { 
  }
  
  ngOnInit() {
    this.authSer.checkAuthStatus().subscribe((response:any)=>{
      this.isUserLoggedIn = response.loggedIn;
    })
    this.route.params.subscribe((params)=>{
        this.currLocation = params['location'] ? params['location'] : 'Mumbai';
    })
  }


  openDialog(){
    this.dialogSer.openDialog();
  }

  redirectToUserPage(){
    this.router.navigate(['/user-profile'])
  }

}
