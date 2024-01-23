import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerService {
  public Servers = new BehaviorSubject([
    { name: 'Server1', url: '../../../../../assets/login-background.jpg' },
    { name: 'Server2', url: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', url: '../../../../../assets/login-background.jpg' },
  ]);
  getServers() {
    return this.Servers.asObservable();
  }
}
