import { Component, Input } from '@angular/core';
import { ServerModel } from '../../../models/server.model';

@Component({
  selector: 'app-promoted-card',
  standalone: true,
  imports: [],
  templateUrl: './promoted-card.component.html',
  styleUrl: './promoted-card.component.scss',
})
export class PromotedCardComponent {
  @Input() server: ServerModel;
}
