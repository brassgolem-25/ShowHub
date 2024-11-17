import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatFormFieldModule,HeaderComponent,TabsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  userEmail:string='';
  userName:string='';
  constructor(private authSer : AuthService){
  }
  ngOnInit() {
      this.authSer.checkAuthStatus().subscribe((res)=>{
        this.userEmail = res['user']['data'];
        console.log(this.userEmail);
        this.authSer.getUserDetails(this.userEmail).subscribe((res)=>{
          this.userName=res['name'];
        })
      })

  }
}
