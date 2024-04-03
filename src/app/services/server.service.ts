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
      .get<{ count: number; data: ServerModel[] }>(
        'https://metins-be.onrender.com/api/server/servers'
      )
      .subscribe((res) => {
        this.Servers.next(res.data);
      });
  }

  setPremiumServers() {
    const sortedServers = this.filterBy(
      undefined,
      undefined,
      undefined,
      undefined,
      'Ascending',
      true
    );

    this.premiumServers.next(sortedServers);
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
    order: string,
    is_premium: boolean
  ) {
    let servers = [...this.Servers.value];
    if (language || category || focus || is_premium) {
      servers = servers.filter(
        (item) =>
          (!language || item.languages?.includes(language)) &&
          (!category || item.category === category) &&
          (!focus || item.focus.includes(focus)) &&
          (!is_premium || item.is_premium === true)
      );
    }
    const sortedServers = this.sortBy(servers, sortBy);
    if (order === 'Ascending') sortedServers.reverse();
    this.filteredServers.next(sortedServers);
    return sortedServers;
  }

  filterByName(value: string) {
    const servers = [...this.Servers.value];
    const filteredServers = servers.filter((item) => {
      return item.name.toLocaleLowerCase().match(value.toLowerCase());
    });
    const sortedServers = this.sortBy(filteredServers, 'no_votes');
    this.filteredServers.next(sortedServers.reverse());
  }

  saveServer(server: FormData) {
    this.http
      .post('https://metins-be.onrender.com/api/server', server)
      .subscribe();
  }

  patchServer(server: FormData, serverId: string) {
    this.http
      .patch(`https://metins-be.onrender.com/api/server/${serverId}`, server)
      .subscribe();
  }
  setRating(value: number, server_id: string) {
    this.http
      .patch(
        `https://metins-be.onrender.com/api/update_server_rating/${server_id}`,
        { value: value }
      )
      .subscribe();
  }
}
