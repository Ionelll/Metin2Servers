import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, MatIconModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  public user: boolean;
  public media = window.innerWidth;
  currentRoute: string = '';
  constructor(private router: Router) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.currentRoute = res.url;
        console.log(res.url);
      }
    });
  }
  goTop() {
    window.scrollTo(0, 0);
  }
}
