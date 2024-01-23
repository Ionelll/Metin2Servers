import { Component } from '@angular/core';
import { MainContentComponent } from '../../components/main-content/component/main-content.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MainContentComponent, RouterOutlet],
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
    console.log(window.scrollY);
    if (window.scrollY > 200) {
      document.getElementById('back-top').classList.remove('back-top');
    } else {
      document.getElementById('back-top').classList.add('back-top');
    }
  }
}
