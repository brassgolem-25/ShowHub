import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowTimeService {
  serverURL = 'http://localhost:3000';
  constructor(private http : HttpClient) { }
  
  getShowTimeDetails(data:{}):Observable<any>{
    return this.http.post(`${this.serverURL}/api/showTime/showTimeDetails`,data);
  }
  
}
