import { Component } from '@angular/core';
import { MainContentComponent } from '../../components/main-content/component/main-content.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PromotedServersComponent } from '../../components/promoted-servers/promoted-servers.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MainContentComponent,
    HeroComponent,
    LogoComponent,
    PromotedServersComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor() {
    document.addEventListener('scroll', () => {
      this.scrollTrack();
    });
  }
  scrollTrack() {
    if (window.scrollY > 1000) {
      document.getElementById('back-top').classList.remove('back-top');
      document.getElementById('back-top').classList.add('back-top-active');
    } else {
      document.getElementById('back-top').classList.add('back-top');
      document.getElementById('back-top').classList.remove('back-top-active');
    }
  }
}
