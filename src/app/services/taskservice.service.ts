// task.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://dev256586.service-now.com/api/now/table/sc_task'; // Replace with your ServiceNow API URL
  private username = 'admin';
  private password = 'Kf2kZ1yNS-$w';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
