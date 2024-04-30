import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private emitError = new Subject<any>();
  setError(value: string[]) {
    if (value.length > 1) {
      let missingValues: string = '';

      value.splice(value.length - 1, 0, 'and');
      for (let i = 0; i < value.length; i++) {
        if (i == value.length - 2 || i == value.length - 3)
          missingValues = missingValues + value[i] + ' ';
        else missingValues = missingValues + value[i] + ', ';
      }

      this.emitError.next(
        `All fields are required! Please provide : ${missingValues}`
      );
    } else this.emitError.next(value);
  }
  getError() {
    return this.emitError.asObservable();
  }
}
