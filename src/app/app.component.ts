import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  animate,
  query,
  style,
  transition,
  trigger,
  group,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, SnackbarComponent],
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
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        group([
          query(':enter', [animate('0.5s 0.2s ease', style({ opacity: 1 }))], {
            optional: true,
          }),
          query(':leave', [animate('0.3s ease', style({ opacity: 0 }))], {
            optional: true,
          }),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Metin2ServerList';
  loading: boolean;
  constructor(
    private contexts: ChildrenOutletContexts,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loading = true;
  }

  getAnimation() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token && token.length > 0) this.authService.checkToken();
  }
}
