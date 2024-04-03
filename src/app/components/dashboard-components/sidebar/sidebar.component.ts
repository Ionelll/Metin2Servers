import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

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
export class SidebarComponent implements OnInit, OnDestroy {
  media: number;
  showSidebar: boolean;
  userHasServer: boolean;
  authServiceSub = new Subscription();
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.media = window.innerWidth;
  }
  ngOnInit(): void {
    this.authServiceSub = this.authService.getUser().subscribe((res) => {
      if (res && res.servers[0]?.server_id) this.userHasServer = true;
      else this.userHasServer = false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
}
