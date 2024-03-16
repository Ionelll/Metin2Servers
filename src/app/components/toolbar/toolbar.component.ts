import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [LogoComponent, CommonModule, MatIconModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) this.currentRoute = res.url;
    });
  }

  public user: boolean = false;

  public currentRoute: string = '';
  public media = window.innerWidth;

  ngOnInit(): void {
    this.authService.checkLoggedin().subscribe((res) => {
      this.user = res;
    });
  }
}
