import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverURL = 'http://localhost:3000';
  private userEmail:string='';
  constructor(private http : HttpClient) { }
  
  authenticateGoogle():Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/auth/google`);
  }

  checkAuthStatus():Observable<any>{
    return this.http.get('http://localhost:3000/api/auth/check-session', { withCredentials: true })
  }

  authenticateFacebook(userData:{}):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/auth/facebook-authentication',userData,{ withCredentials: true });
  }

  getUserDetails(email:string):Observable<any>{
    // console.log(`${this.serverURL}/auth/userData?email=${email}`);
    return this.http.get(`${this.serverURL}/auth/userData?email=${email}`);
  }
  
}
