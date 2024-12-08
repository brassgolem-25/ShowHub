import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate ,Router} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private authSer: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const path = route.routeConfig?.path;
    return this.authSer.checkAuthStatus().pipe(map((response: any) => {
      if (path == 'user-profile') {
        if (response.loggedIn) {
          return true;
        }
        this.router.navigate(['explore/home/mumbai'])
        return false;
      }else {
        if (response.loggedIn) {
          this.router.navigate(['explore/home/mumbai'])
          return false;
        }
        return true;
      }
    }))
  }
}
