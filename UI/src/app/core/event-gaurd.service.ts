import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';
import { DialogService } from './dailog.service';

@Injectable({
  providedIn: 'root'
})
export class EventGaurd implements CanActivate {

  constructor(private router: Router, private dialogSer: DialogService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const eventLocation: string = route.params['event-location'];
    if (eventLocation.includes('event')) {
      let location: string = eventLocation.split('-')[1];
      return this.dialogSer.getCitiesList().pipe(map((validLocations: string[]) => {
        location = location.charAt(0).toUpperCase() + location.slice(1)
        if (validLocations.includes(location)) {
          return true;
        }
        this.router.navigate(['explore/home/mumbai']);
        return false;
      }));
    }
    this.router.navigate(['explore/home/mumbai']);
    return false;
  }
}
