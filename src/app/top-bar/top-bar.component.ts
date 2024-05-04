import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  showMenu: boolean = false;
  showUserMenu: boolean = false;

  constructor(private authService: AuthService) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  openUserMenu(): void {
    this.showUserMenu = !this.showUserMenu; // Toggle the boolean value
  }

  logout(): void {
    this.authService.logout();
  }
}
