import { Component, OnInit } from '@angular/core';
import { EventsModel } from '../../../models/events.model';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../subcomponents/event-card/event-card.component';
import { EventsService } from '../events.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent, MatIconModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  constructor(private eventsService: EventsService) {}
  public eventsList: EventsModel[];
  public focusedEvent: number = 1;
  public eventsLength: number;

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((res) => {
      this.eventsList = res;
      this.eventsLength = this.eventsList.length;
    });
  }
}
