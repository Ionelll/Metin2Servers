import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../../../../services/server.service';
import { Subscription } from 'rxjs';
import { CountryFlags } from '../../../../../models/country-flags';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent implements AfterViewInit, OnDestroy {
  modalStatus: boolean = false;
  orderToggle = 'Ascending';
  focusValue: string;
  categoryValue: string;
  languageValue: string;
  sortbyValue = 'rating';
  countryFlags = CountryFlags;
  statusSub = new Subscription();

  constructor(
    private filterService: FilterService,
    private serversService: ServerService
  ) {}

  ngAfterViewInit(): void {
    this.statusSub = this.filterService.getModalStatus().subscribe((res) => {
      this.modalStatus = res;
    });
  }
  closeModal() {
    this.serversService.filterBy(
      this.sortbyValue,
      this.languageValue,
      this.categoryValue,
      this.focusValue,
      this.orderToggle,
      undefined
    );
    this.filterService.setModalStatus(false);
  }
  cancel() {
    this.filterService.setModalStatus(false);
  }

  reloadServers() {
    this.serversService.reloadServers();
  }
  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }
}
