import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServerModel } from '../models/server.model';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from '@angular/cdk/a11y';
import { ServersConstant } from '../models/servers.constant';

@Injectable({ providedIn: 'root' })
export class ServerService {
  public Servers = new BehaviorSubject(ServersConstant);
  getServers() {
    return this.Servers.asObservable();
  }
}
