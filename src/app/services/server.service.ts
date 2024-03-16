import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServersConstant } from '../models/servers.constant';
import { ServerModel } from '../models/server.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private http: HttpClient) {}

  private Servers = new BehaviorSubject<ServerModel[]>([]);
  private filteredServers = new Subject<ServerModel[]>();
  private premiumServers = new BehaviorSubject<ServerModel[]>([]);
  getServers() {
    return this.Servers.asObservable();
  }
  getFilteredServers() {
    return this.filteredServers.asObservable();
  }
  reloadServers() {
    this.filteredServers.next(this.Servers.value);
  }
  setServers() {
    this.http
      .get<{ count: 1; data: ServerModel[] }>(
        'https://metins-be.onrender.com/api/server/servers'
      )
      .subscribe((res) => {
        this.Servers.next(res.data);
      });
  }

  setPremiumServers() {
    this.http
      .get<{ count: 1; data: ServerModel[] }>(
        'https://metins-be.onrender.com/api/server/servers?is_premium=True'
      )
      .subscribe((res) => {
        this.premiumServers.next(res.data);
      });
  }
  getPremiumServers() {
    return this.premiumServers.asObservable();
  }
  sortBy(servers: ServerModel[], key: string) {
    if (servers.length <= 0) return servers;
    else if (typeof servers[0][key] == 'string') {
      servers.sort((a, b) => b[key].localeCompare(a[key]));
    } else servers.sort((a, b) => a[key] - b[key]);
    return servers;
  }
  filterBy(
    sortBy: string,
    language: string,
    category: string,
    focus: string,
    order: string
  ) {
    let servers = [...this.Servers.value];
    if (language || category || focus) {
      servers = servers.filter(
        (item) =>
          (!language || item.languages?.includes(language)) &&
          (!category || item.category === category) &&
          (!focus || item.focus.includes(focus))
      );
    }
    const sortedServers = this.sortBy(servers, sortBy);
    if (order === 'Ascending') sortedServers.reverse();
    this.filteredServers.next(sortedServers);
  }

  filterByName(value: string) {
    const servers = [...this.Servers.value];
    const filteredServers = servers.filter((item) => {
      return item.name.toLocaleLowerCase().match(value.toLowerCase());
    });
    const sortedServers = this.sortBy(filteredServers, 'rating');
    this.filteredServers.next(sortedServers.reverse());
  }

  saveServer(server: FormData) {
    this.http
      .post('https://metins-be.onrender.com/api/server', server)
      .subscribe();
  }
}
