import { Component, Input } from '@angular/core';
import { ServerModel } from '../../../../models/server.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  style,
  transition,
  trigger,
  query,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './server-card.component.html',
  styleUrl: './server-card.component.scss',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', boxShadow: 'none' }),
        animate(
          '0.3s 0.1s ease',
          style({
            transform: 'translateY(0)',
            boxShadow: '0px 1px 20px 3px rgba(255, 255, 255, 0.486)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease',
          style({ transform: 'translateY(-100%)', boxShadow: 'none' })
        ),
      ]),
    ]),
  ],
})
export class ServerCardComponent {
  @Input() item: ServerModel;
  public rate = 0;
  public hover: boolean;
  public media = false;
  constructor() {
    console.log(window.innerWidth);
    if (window.innerWidth < 800) this.media = true;
    else this.media = false;
  }
}
