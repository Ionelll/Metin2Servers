import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { HeroComponent } from '../../components/landing-page-components/hero/hero.component';
import { PromotedServersComponent } from '../../components/landing-page-components/promoted-servers/promoted-servers.component';
import { MainContentComponent } from '../../components/landing-page-components/main-content/component/main-content.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MainContentComponent,
    PromotedServersComponent,
    HeroComponent,
    LogoComponent,
    ToolbarComponent,
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
      document.getElementById('back-top')?.classList.remove('back-top');
      document.getElementById('back-top')?.classList.add('back-top-active');
    } else {
      document.getElementById('back-top')?.classList.add('back-top');
      document.getElementById('back-top')?.classList.remove('back-top-active');
    }
  }
}
