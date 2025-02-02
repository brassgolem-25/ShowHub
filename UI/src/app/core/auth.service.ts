import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverURL = 'http://localhost:3000';
  constructor(private http: HttpClient,private auth : AngularFireAuth) { }

  authenticateGoogle(redirect_url: string): Observable<any> {
    return this.http.get<any>(`${this.serverURL}/auth/google?uri=${redirect_url}`);
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get('http://localhost:3000/auth/check-session', { withCredentials: true })
  }

  authenticateFacebook(userData: {}): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/facebook-authentication', userData, { withCredentials: true });
  }

  getUserDetails(email: string): Observable<any> {
    return this.http.get(`${this.serverURL}/auth/userData?email=${email}`);
  }

  logoutUser(): Observable<any> {
    return this.http.get(`${this.serverURL}/auth/logoutUser`, { withCredentials: true });
  }

  testSignIn(userData:{email:string,password:string}): any {
    this.auth.signInWithEmailAndPassword(userData.email,userData.password).then((user)=>{
      console.log(user);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
