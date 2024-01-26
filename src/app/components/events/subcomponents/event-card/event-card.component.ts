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
  @Input() focusedEvent: number;
  @Input() eventsLength: number;
  public hide: boolean;
  ngOnInit(): void {
    this.hide =
      this.event.eventId !=
      (this.focusedEvent && this.focusedEvent - 1 && this.focusedEvent + 1);
  }
}
