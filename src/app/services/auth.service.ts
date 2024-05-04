// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev256586.service-now.com'; // Replace this with your ServiceNow API URL
  private clientId = '4f2ee7bf983102102ea9416dc5391eab'; // Replace this with your client ID
  private clientSecret = 'YwMR7|UKN~'; // Replace this with your client secret

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/oauth_token.do`;
    const body = `grant_type=password&client_id=${this.clientId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap(response => {
        // You might handle authentication tokens or other data here
        // For example, you could store tokens in local storage
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    // Clear tokens from local storage or any other cleanup
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
