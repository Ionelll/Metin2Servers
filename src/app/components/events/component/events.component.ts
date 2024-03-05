import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../subcomponents/event-card/event-card.component';
import { ServerService } from '../../../services/server.service';
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
import { ServerModel } from '../../../models/server.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventCardComponent, MatIconModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  animations: [
    trigger('carousel-animation', [
      transition(':enter,:leave', [
        query(
          '.server',
          [
            style({
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
            }),
          ],
          { optional: true }
        ),

        query(':enter', [style({ opacity: 0 })]),
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
  constructor(private serversService: ServerService) {}
  public serversList: ServerModel[];
  public focusedEvent: number = 0;
  public animation: string;
  public x = 0;
  private timer: any;

  ngOnInit(): void {
    this.serversService.getPremiumServers().subscribe((res) => {
      this.serversList = res;
    });
  }
  getAnimation(index: number) {
    return index === this.focusedEvent;
  }
  carouselanimation() {
    if (this.x < this.serversList.length - 1) {
      this.x++;
    } else {
      this.x = 0;
    }
    this.timer = setTimeout(() => {
      this.carouselanimation();
    }, 5000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.carouselanimation();
    }, 5000);
  }
}
