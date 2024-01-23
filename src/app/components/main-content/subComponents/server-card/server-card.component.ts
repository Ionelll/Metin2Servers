import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [],
  templateUrl: './server-card.component.html',
  styleUrl: './server-card.component.scss',
})
export class ServerCardComponent {
  @Input() item: string;
}
