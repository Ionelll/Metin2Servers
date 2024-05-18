import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerCardComponent } from '../subComponents/server-card/server-card.component';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../../../services/server.service';
import { ServerModel } from '../../../../models/server.model';
import { FilterService } from '../services/filter.service';
import { FilterModalComponent } from '../subComponents/filter-modal/filter-modal.component';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../../models/user.model';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterOutlet,
    ServerCardComponent,
    CommonModule,
    FilterModalComponent,
    FormsModule,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit, OnDestroy {
  constructor(
    private serverService: ServerService,
    private filterService: FilterService,
    private authService: AuthenticationService
  ) {}
  public servers: ServerModel[];
  toggleOrder = 'Ascending';
  searchValue: string;
  noServers = false;
  userRatings: UserModel['ratings'];
  serversSub = new Subscription();
  filteredSub = new Subscription();
  authSub = new Subscription();

  ngOnInit(): void {
    this.serversSub = this.serverService.getServers().subscribe((res) => {
      if (res) this.servers = res;
      if (this.servers.length <= 0) this.noServers = true;
      else this.noServers = false;
    });
    this.filteredSub = this.serverService
      .getFilteredServers()
      .subscribe((res) => {
        if (res) this.servers = res;
        if (this.servers.length <= 0) this.noServers = true;
        else this.noServers = false;
      });
    this.authSub = this.authService.getUser().subscribe((res) => {
      if (res) {
        this.userRatings = res.ratings;
        this.setUserRating();
      }
    });
  }
  setUserRating() {
    if (this.userRatings)
      this.userRatings.forEach((item) => {
        const x = this.servers.map((e) => e.name).indexOf(item.server);

        if (x >= 0) this.servers[x].user_rating = item.value;
      });
  }

  openModal() {
    this.filterService.openModal();
  }
  reloadServers() {
    this.serverService.reloadServers();
    this.searchValue = '';
  }
  searchServer(event) {
    if (
      event.inputType === 'deleteContentForward' ||
      event.inputType === 'deleteContentBackward'
    )
      this.serverService.reloadServers();
    this.serverService.filterByName(this.searchValue);
  }
  goTop() {
    window.scrollTo(0, 0);
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.filteredSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
