import { Component, Input, OnInit } from '@angular/core';
import { EventsModel } from '../../../../models/events.model';
import { CommonModule } from '@angular/common';
import { ServerModel } from '../../../../models/server.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent implements OnInit {
  @Input() server: ServerModel;

  ngOnInit(): void {}
}
