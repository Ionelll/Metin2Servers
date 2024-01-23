import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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
}
