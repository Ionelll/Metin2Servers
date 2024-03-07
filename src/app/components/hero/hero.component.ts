import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LogoComponent } from '../logo/logo.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent, MatIcon],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('slide', [
      transition('* <=> *', [
        query(':leave', [style({ display: 'none' })], {
          optional: true,
        }),

        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease', style({ transform: 'translateX(0)' })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  public currentRoute: string = '';
  public media = window.innerWidth;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) this.currentRoute = res.url;
    });
  }
  public userSub = new Subscription();
  public user: boolean = false;
  public active = 0;

  changeTimer() {
    if (this.active < 2) this.active++;
    else this.active = 0;
    setTimeout(() => {
      this.changeTimer();
    }, 5000);
  }

  ngOnInit(): void {
    this.userSub = this.authService.checkLoggedin().subscribe((res) => {
      this.user = res;
    });
    setTimeout(() => {
      this.changeTimer();
    }, 5000);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}