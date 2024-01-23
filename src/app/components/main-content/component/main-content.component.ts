import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerCardComponent } from '../subComponents/server-card/server-card.component';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../../services/server.service';
import { MatIconModule } from '@angular/material/icon';
import { ServerModel } from '../../../models/server.model';
import { ServersConstant } from '../../../models/servers.constant';
import { FilterService } from '../services/filter.service';
import { FilterModalComponent } from '../subComponents/filter-modal/filter-modal.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterOutlet,
    ServerCardComponent,
    CommonModule,
    MatIconModule,
    FilterModalComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements AfterViewInit {
  constructor(
    private serverService: ServerService,
    private filterService: FilterService
  ) {}
  public servers: any;
  toggleOrder = 'Ascending';
  sortServerList(order: string) {
    this.servers.reverse();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.serverService.getServers().subscribe((res) => {
        if (res) this.servers = res;
        console.log(res);
      });
    });
  }

  openModal() {
    this.filterService.openModal();
  }
}
