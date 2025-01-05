import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { DialogService } from './dailog.service';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocationGuard implements CanActivate {
  constructor(private router:Router,private dialogSer:DialogService) { 

  }

  canActivate(route:ActivatedRouteSnapshot):Observable<boolean> {
     let location:string = route.params['location'];
     const currURL = route.url.map((url:any)=>url.path).join('/');
     return this.dialogSer.getCitiesList().pipe(map((validLocations:string[])=>{
      location = location.charAt(0).toUpperCase() + location.slice(1)
      if(validLocations.includes(location)){
        return true;
       }
       this.router.navigate(['explore/home/mumbai']);
       return false;
     }));
  }
}
