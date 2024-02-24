import { Component, OnInit } from '@angular/core';
import { MainContentComponent } from '../../components/main-content/component/main-content.component';
import { EventsComponent } from '../../components/events/component/events.component';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MainContentComponent, EventsComponent, RouterLink, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  public userSub = new Subscription();
  public user: boolean = false;

  constructor(private authService: AuthenticationService) {
    document.addEventListener('scroll', () => {
      this.scrollTrack();
    });
  }
  scrollTrack() {
    if (window.scrollY > 1000) {
      document.getElementById('back-top').classList.remove('back-top');
    } else {
      document.getElementById('back-top').classList.add('back-top');
    }
  }
  changeOverlay(hover: boolean, emitter: string) {
    if (hover)
      if (emitter === 'login')
        document
          .getElementById('login-img')
          .style.setProperty('filter', 'none');
      else
        document
          .getElementById('signup-img')
          .style.setProperty('filter', 'none');
    else {
      document
        .getElementById('login-img')
        .style.setProperty('filter', 'grayscale(100%)');
      document
        .getElementById('signup-img')
        .style.setProperty('filter', 'grayscale(100%) ');
    }
  }

  ngOnInit(): void {
    this.userSub = this.authService.checkLoggedin().subscribe((res) => {
      this.user = res;
    });
  }
}
