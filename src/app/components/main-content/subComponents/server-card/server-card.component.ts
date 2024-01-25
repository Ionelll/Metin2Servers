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
        style({ transform: 'translateY(-100%)' }),
        animate('0.3s ease', style({ trasform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class ServerCardComponent {
  @Input() item: ServerModel;
  public rate = 0;
  public hover: boolean;
}
