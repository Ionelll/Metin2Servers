import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LogoComponent } from '../../logo/logo.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent, MatIcon],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('slide', [
      transition('* <=> *', [
        group([
          query(':leave', style({ display: 'none' }), {
            optional: true,
          }),
          query(
            ':enter',
            [
              style({ transform: 'scale(0)' }),
              animate('1s ease', style({ transform: 'scale(1)' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {
  public active = 0;

  changeTimer() {
    if (this.active < 2) this.active++;
    else this.active = 0;
    setTimeout(() => {
      this.changeTimer();
    }, 10000);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changeTimer();
    }, 10000);
  }
}
