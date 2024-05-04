import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev256586.service-now.com'; // Replace this with your ServiceNow API URL
  private clientId = '4f2ee7bf983102102ea9416dc5391eab'; // Replace this with your client ID
  private clientSecret = 'YwMR7|UKN~'; // Replace this with your client secret
  private tokenExpiration: Date | null = null;
  private profileUrl = 'https://dev256586.service-now.com/api/now/table/sys_user'; // Replace with your ServiceNow API URL
  private username = 'admin';
  private password = 'Kf2kZ1yNS-$w';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/oauth_token.do`;
    const body = `grant_type=password&client_id=${this.clientId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap(response => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        const expiresIn = response.expires_in; // Token expiration time in seconds

        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('tokenExpiration', expirationDate.getTime().toString());


        this.getUserProfileData(username).subscribe(profile => {
          localStorage.setItem('username', username);
          if(profile.result[0].avatar != null)
          localStorage.setItem('profilePicUrl', 'https://dev256586.service-now.com/' + profile.result[0].avatar + ".iix");
          localStorage.setItem('sysId', profile.result[0].sys_id);
        })
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  getUserProfileData(username: String): Observable<any> {
    const profileUrl = `${this.profileUrl}?sysparm_query=user_name=${username}&sysparm_limit=1`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
    return this.http.get<any[]>(profileUrl, {headers});
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  isTokenValid(): boolean {
    const expirationDateString = localStorage.getItem('tokenExpiration');
    if (!expirationDateString) {
      return false;
    }
    const expirationDate = new Date(parseInt(expirationDateString, 10));
    return expirationDate > new Date();
  }
}
