import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation-component/navigation.component';
import {
  animate,
  query,
  style,
  transition,
  trigger,
  animateChild,
  group,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition('*<=>*', [
        // Set a default  style for enter and leave
        query(
          ':enter,:leave',
          [
            style({
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: 0,
            }),
          ],
          { optional: true }
        ),
        // Animate the new page in
        query(':enter', [animate('1s ease', style({ opacity: 1 }))], {
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
