import { Injectable } from '@angular/core';
import { eventsConst } from '../../models/PremiumServers.constant';
import { BehaviorSubject } from 'rxjs';
import { EventsModel } from '../../models/events.model';
import { ServerModel } from '../../models/server.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private events = new BehaviorSubject<ServerModel[]>(eventsConst);
  getEvents() {
    return this.events.asObservable();
  }
}
