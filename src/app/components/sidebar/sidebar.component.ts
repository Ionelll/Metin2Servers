import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(+100%)', opacity: 0.2 }),
        animate('0.3s', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(
          '0.3s',
          style({ transform: 'translateX(+100%)', opacity: 0.2 })
        ),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  media: number;
  showSidebar: boolean;
  userHasServer: boolean;
  authServiceSub = new Subscription();
  loggedIn = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.media = window.innerWidth;
  }
  ngOnInit(): void {
    this.authServiceSub.add(
      this.authService.getUser().subscribe((res) => {
        if (res && res.servers[0]?.server_id) this.userHasServer = true;
        else this.userHasServer = false;
      })
    );
    this.authServiceSub.add(
      this.authService.checkLoggedin().subscribe((res) => {
        if (res) this.loggedIn = true;
        else this.loggedIn = false;
      })
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
}
