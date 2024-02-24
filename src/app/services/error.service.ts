import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private emitError = new Subject<any>();
  setError(value: string) {
    this.emitError.next(value);
  }
  getError() {
    return this.emitError.asObservable();
  }
}
