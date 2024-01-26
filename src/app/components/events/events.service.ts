import { Injectable } from '@angular/core';
import { eventsConst } from '../../models/events.constant';
import { BehaviorSubject } from 'rxjs';
import { EventsModel } from '../../models/events.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private events = new BehaviorSubject<EventsModel[]>(eventsConst);
  getEvents() {
    return this.events.asObservable();
  }
}
