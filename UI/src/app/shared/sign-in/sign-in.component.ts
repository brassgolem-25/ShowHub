import { Component, OnInit } from '@angular/core';
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
declare var FB: any;  

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ HeaderComponent, TabsComponent,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
      phoneNumber: new FormControl('',[Validators.required])
  })
  constructor(public authSer : AuthService,public router:Router,private route:ActivatedRoute){
  }

  authenticateWithProvider(type:string){
    this.authSer.authenticateGoogle().subscribe((response:any)=>{
      const URL = response['redirectURL'];
      console.log(URL)
      window.location.href = URL;
    });
  }

  loadFacebookSDK() {
    // Initialize Facebook SDK
    FB.init({
      appId: environment.facebookAppId,  // Replace with your Facebook App ID
      cookie: true,
      xfbml: true,
      version: 'v16.0'
    });
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.status === 'connected') {
        // User successfully logged in
        this.getUserDetails();

      } else {
        // User did not log in
        console.log('User login failed');
      }
    }, { scope: 'public_profile,email' });
  }

  getUserDetails() {
    FB.api('/me', { fields: 'id,name,email' }, (response: any) => {
      console.log('User Info:', response);
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
      };

      this.authSer.authenticateFacebook(userData).subscribe((response:any)=>{
        if(response['success']){
          window.location.reload();
        }
      })
    });
  }

  ngOnInit(): void {
      this.loadFacebookSDK();
  }
}
