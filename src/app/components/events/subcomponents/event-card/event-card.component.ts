import { Component, Input, OnInit } from '@angular/core';
import { EventsModel } from '../../../../models/events.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent implements OnInit {
  @Input() event: EventsModel;

  ngOnInit(): void {}
}
