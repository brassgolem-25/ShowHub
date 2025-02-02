import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LiveEvents } from '../shared/types/liveEvent';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LiveEventService {
  apiUrl = environment.apiUrl;
  constructor(private http:HttpClient,private router:Router) { }

  getLiveEventsByEventCode(data:{"event_code":string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}api/liveEvents/getLiveEventsByEventCode`,data);
  }

  getBasicLiveEventsByLocation(data:{"city":string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}api/liveEvents/getBasicLiveEventsByLocation`,data);
  }

  updateEventLikeCount(data:{email:string,event_code:string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}api/liveEvents/updateLikeCount`,data);
  }

  getAllEventsByLocation(data:{city:string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}api/liveEvents/getAllEventsByLocation`,data);
  }

  redirectToEventPageByLocation(event: LiveEvents, currLocation: string) {
      const name = (event.title).toLowerCase().split(" ").join("-");
      console.log(currLocation, name, event.event_code)
      this.router.navigate(['/events', currLocation, name, event.event_code])
  }
}
