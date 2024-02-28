import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatIconModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  public user: boolean;
  private userSub = new Subscription();
  public media = window.innerWidth;
  currentRoute: string = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) this.currentRoute = res.url;
    });
  }
  goTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.userSub = this.authService.checkLoggedin().subscribe((res) => {
      this.user = res;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
