import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  media: number;
  showSidebar: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.media = window.innerWidth;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
