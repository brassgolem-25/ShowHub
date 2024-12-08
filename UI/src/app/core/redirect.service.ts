import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router:Router) {
   }

  redirectToUserPage(){
    this.router.navigate(['/user-profile'])
  }

  redirectToHome(){
    this.router.navigate(['explore/home/mumbai']);
  }

  redirectoLogin(){
    this.router.navigate(['login'])
  }
}
