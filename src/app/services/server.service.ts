import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServersConstant } from '../models/servers.constant';
import { ServerModel } from '../models/server.model';

@Injectable({ providedIn: 'root' })
export class ServerService {
  public Servers = new BehaviorSubject<ServerModel[]>(ServersConstant);

  getServers() {
    return this.Servers.asObservable();
  }
  callServers() {
    const servers = this.sortBy(ServersConstant, 'rating');
    this.Servers.next(servers);
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
          (!focus || item.focus === focus)
      );
    }
    const sortedServers = this.sortBy(servers, sortBy);
    if (order === 'Ascending') sortedServers.reverse();
    console.log(sortedServers);
    this.Servers.next(sortedServers);
  }

  filterByName(value: string) {
    let servers = [...this.Servers.value];
    let filteredServers = servers.filter((item) => {
      return item.name.toLocaleLowerCase().match(value.toLowerCase());
    });
    this.Servers.next(filteredServers);
  }
}
