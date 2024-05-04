import { Component } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use styleUrls instead of styleUrl
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/tasks']); // Assuming 'tasks' is the path to the task page
      },
      (error) => {
        this.error = error.message; // Display error message to user
      }
    );
  }
}
