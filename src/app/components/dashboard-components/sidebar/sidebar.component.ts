import { Component, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  media: number;
  showSidebar: boolean;
  userHasServer: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.media = window.innerWidth;
  }
  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      if (res.servers[0].server_id) this.userHasServer = true;
      else this.userHasServer = false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
