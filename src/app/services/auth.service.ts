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
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
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
