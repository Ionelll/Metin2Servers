import { Component, OnInit } from '@angular/core';
import { PromotedCardComponent } from './promoted-card/promoted-card.component';
import { ServerModel } from '../../../models/server.model';
import { ServerService } from '../../../services/server.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-promoted-servers',
  standalone: true,
  imports: [PromotedCardComponent, CommonModule],
  templateUrl: './promoted-servers.component.html',
  styleUrl: './promoted-servers.component.scss',
})
export class PromotedServersComponent implements OnInit {
  public servers: ServerModel[];

  constructor(private serversService: ServerService) {}

  ngOnInit(): void {
    this.serversService.getPremiumServers().subscribe((res) => {
      this.servers = res;
    });
  }
}
