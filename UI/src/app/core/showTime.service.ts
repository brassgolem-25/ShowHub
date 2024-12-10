import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowTimeService {
  serverURL = 'http://localhost:3000';
  constructor(private http : HttpClient) { }
  
  getShowTimeDetails(data:{imdbID:string,city:string}):Observable<any>{
    return this.http.get(`${this.serverURL}/api/showTime/showTimeDetails?imdbID=${data.imdbID}&city=${data.city}`);
  }
  
}
