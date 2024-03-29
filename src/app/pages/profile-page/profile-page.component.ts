import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user.model';
import { SidebarComponent } from '../../components/dashboard-components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  animations: [
    trigger('fade', [
      transition('*<=>*', [
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
