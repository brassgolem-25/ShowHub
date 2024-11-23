import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveEventService {

  constructor(private http:HttpClient) { }

  getLiveEventsByEventCode(data:{"event_code":string}):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/liveEvents/getLiveEventsByEventCode',data);
  }

  getBasicLiveEventsByLocation(data:{"city":string}):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/liveEvents/getBasicLiveEventsByLocation',data);
  }
}
