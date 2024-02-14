import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from '../../../services/server.service';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private modalStatus = new BehaviorSubject<boolean>(false);
  openModal() {
    this.modalStatus.next(true);
  }
  getModalStatus() {
    return this.modalStatus.asObservable();
  }
  closeModal() {
    this.modalStatus.next(false);
  }
  setModalStatus(value: boolean) {
    this.modalStatus.next(value);
  }
}
