import { Component, Input } from '@angular/core';
import { ServerModel } from '../../../models/server.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CountryFlags } from '../../../models/country-flags';

@Component({
  selector: 'app-promoted-card',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './promoted-card.component.html',
  styleUrl: './promoted-card.component.scss',
})
export class PromotedCardComponent {
  @Input() server: ServerModel;
}
