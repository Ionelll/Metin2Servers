import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../../../../services/server.service';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent implements AfterViewInit {
  modalStatus: boolean = false;
  orderToggle = 'Ascending';
  languageToggle: boolean;
  categoryToggle: boolean;
  focusToggle: boolean;
  focusValue: string;
  categoryValue: string;
  languageValue: string;
  sortbyValue = 'rating';

  constructor(
    private filterService: FilterService,
    private serversService: ServerService
  ) {}

  ngAfterViewInit(): void {
    this.filterService.getModalStatus().subscribe((res) => {
      this.modalStatus = res;
    });
  }
  closeModal() {
    this.languageValue = this.languageToggle ? this.languageValue : undefined;
    this.categoryValue = this.categoryToggle ? this.categoryValue : undefined;
    this.focusValue = this.focusToggle ? this.focusValue : undefined;
    this.serversService.filterBy(
      this.sortbyValue,
      this.languageValue,
      this.categoryValue,
      this.focusValue,
      this.orderToggle
    );
    this.filterService.setModalStatus(false);
  }
  cancel() {
    this.filterService.setModalStatus(false);
  }

  reloadServers() {
    this.serversService.reloadServers();
  }
}
