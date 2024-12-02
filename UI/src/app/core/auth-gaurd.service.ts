import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private authSer: AuthService,private router:Router) { }

  canActivate(): Observable<boolean> {
   return this.authSer.checkAuthStatus().pipe(map((response:any)=>{
    if(!response.loggedIn){
      this.router.navigate(['explore/home/mumbai'])
      return false;
    }
    return true;
   }))
  }
}
