import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    LogoComponent,
    CommonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd && res.url === '/profile/server') {
        console.log(res.url);
        this.currentRoute = true;
      } else {
        this.currentRoute = false;
      }
    });
  }

  private subs = new Subscription();
  public currentRoute: boolean;
  public media = window.innerWidth;
  public user: boolean;
  public hasServer: boolean;

  ngOnInit(): void {
    this.subs.add(
      this.authService.getUser().subscribe((res) => {
        if (res) {
          this.user = true;
          if (res.servers[0]?.server_id) this.hasServer = true;
        } else {
          this.user = false;
          this.hasServer = false;
        }
      })
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
