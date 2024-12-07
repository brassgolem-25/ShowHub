import { Component, OnInit } from '@angular/core';
import { GenericHeaderComponent } from "../generic-header/generic-header.component";
import { HeaderComponent } from "../header/header.component";
import { TabsComponent } from "../tabs/tabs.component";
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
declare var FB: any;

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HeaderComponent,CommonModule, TabsComponent, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')])
  })
  redirectUrl:string='';
  constructor(public authSer: AuthService, public router: Router, private route: ActivatedRoute) {
  }


  authenticateWithProvider(type: string) {
    this.authSer.authenticateGoogle(this.redirectUrl).subscribe((response: any) => {
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
        redirect_uri:this.redirectUrl
      };

      this.authSer.authenticateFacebook(userData).subscribe((response: any) => {
          if(response['success']){
            this.router.navigate([response['redirect_uri']]);
          }
      })
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.redirectUrl=params['redirect_url']
    })
    this.loadFacebookSDK();
  }
}
