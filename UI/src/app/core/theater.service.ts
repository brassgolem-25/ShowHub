import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  serverURL = 'http://localhost:3000';
  constructor(private http : HttpClient) { }
  
  getTheatreDetails(data:{}):Observable<any>{
    return this.http.post(`${this.serverURL}/api/theatre/theatreDetails`,data);
  }
  
}
