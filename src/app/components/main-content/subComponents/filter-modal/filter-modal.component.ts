import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent implements AfterViewInit {
  modalStatus: boolean = false;

  constructor(private filterService: FilterService) {}

  ngAfterViewInit(): void {
    this.filterService.getModalStatus().subscribe((res) => {
      console.log('hi');
      this.modalStatus = res;
    });
  }
  closeModal() {
    this.filterService.closeModal();
  }
}
