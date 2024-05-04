import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task Dashboard';
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isTokenValid();
  }
}
