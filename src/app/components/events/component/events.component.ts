import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsModel } from '../../../models/events.model';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../subcomponents/event-card/event-card.component';
import { EventsService } from '../events.service';
import { MatIconModule } from '@angular/material/icon';
import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent, MatIconModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  animations: [
    trigger('carousel-animation', [
      transition('* <=> *', [
        query(
          ':leave',
          [
            style({
              position: 'absolute',
              top: 0,
            }),
          ],
          { optional: true }
        ),

        query(':enter', [style({ opacity: 0 })], { optional: true }),
        group([
          query(':enter', [animate('0.5s', style({ opacity: 1 }))], {
            optional: true,
          }),
          query(':leave', [animate('0.5s', style({ opacity: 0 }))], {
            optional: true,
          }),
        ]),
      ]),
    ]),
  ],
})
export class EventsComponent implements OnInit, AfterViewInit {
  constructor(private eventsService: EventsService) {}
  public eventsList: EventsModel[];
  public focusedEvent: number = 0;
  public animation: string;
  public x = 0;
  private timer: any;

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((res) => {
      this.eventsList = res;
    });
  }
  getAnimation(index: number) {
    return index === this.focusedEvent;
  }
  carouselanimation() {
    if (this.x < this.eventsList.length - 1) {
      this.x++;
    } else {
      this.x = 0;
    }
    this.timer = setTimeout(() => {
      this.carouselanimation();
    }, 20000);
  }
  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.carouselanimation();
    }, 20000);
  }

  ngAfterViewInit(): void {
    // this.carouselanimation();
  }
}
