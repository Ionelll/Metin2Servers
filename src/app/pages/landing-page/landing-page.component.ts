import { Component } from '@angular/core';
import { MainContentComponent } from '../../components/main-content/component/main-content.component';
import { EventsComponent } from '../../components/events/component/events.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MainContentComponent, EventsComponent],
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
    if (window.scrollY > 600) {
      document.getElementById('back-top').classList.remove('back-top');
    } else {
      document.getElementById('back-top').classList.add('back-top');
    }
  }
}
