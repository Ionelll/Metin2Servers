import { Component, Input } from '@angular/core';
import { ServerModel } from '../../../../models/server.model';
@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [],
  templateUrl: './server-card.component.html',
  styleUrl: './server-card.component.scss',
})
export class ServerCardComponent {
  @Input() item: ServerModel;
}
