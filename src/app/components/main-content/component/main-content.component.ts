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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterOutlet,
    ServerCardComponent,
    CommonModule,
    MatIconModule,
    FilterModalComponent,
    FormsModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements AfterViewInit {
  constructor(
    private serverService: ServerService,
    private filterService: FilterService
  ) {}
  public servers: ServerModel[];
  toggleOrder = 'Ascending';
  searchValue: string;
  noServers = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.serverService.getServers().subscribe((res) => {
        if (res) this.servers = res;
        if (this.servers.length <= 0) this.noServers = true;
        else this.noServers = false;
      });
    });
  }

  openModal() {
    this.filterService.openModal();
  }
  reloadServers() {
    this.serverService.callServers();
    this.searchValue = '';
  }
  searchServer(event) {
    if (
      event.inputType === 'deleteContentForward' ||
      event.inputType === 'deleteContentBackward'
    )
      this.serverService.callServers();
    this.serverService.filterByName(this.searchValue);
  }
}
