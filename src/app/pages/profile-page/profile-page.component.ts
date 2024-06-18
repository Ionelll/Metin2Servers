import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterOutlet } from '@angular/router';
import { MyServerComponent } from '../../components/dashboard-components/my-server/my-server.component';
import { PresentationInputComponent } from '../../components/dashboard-components/presentation-input/presentation.component';
import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MyServerComponent,
    PresentationInputComponent,
    CommonModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
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
export class ProfilePageComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit(): void {
    // this.authService.getUser().subscribe((res: UserModel) => {
    //   this.user = res;
    // });
  }
  getAnimation() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
