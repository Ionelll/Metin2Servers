import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainContentComponent } from './components/main-content/component/main-content.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    MainContentComponent,
    LandingPageComponent,
    MainContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
            }),
          ],
          { optional: true }
        ),
        query(':enter', [animate('0.5s', style({ opacity: 1 }))], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'Metin2ServerList';
  constructor(private contexts: ChildrenOutletContexts) {}

  getAnimation() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
