import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  authenticateGoogle():Observable<any>{
    return this.http.get<any>(`http://localhost:3000/auth/google?location=Mumbai`);
  }

  checkAuthStatus():Observable<any>{
    return this.http.get('http://localhost:3000/auth/check-session', { withCredentials: true })
  }

  authenticateFacebook(userData:{}):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/facebook-authentication',userData,{ withCredentials: true });
  }


}
