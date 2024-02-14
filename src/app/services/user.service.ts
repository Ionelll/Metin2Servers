import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  public user = new BehaviorSubject<UserModel>(undefined);

  login(userInput: { email: string | null; password: string | null }) {
    if (userInput)
      this.http
        .post<UserModel>(`${environment.api_url}/login`, userInput)
        .subscribe((res) => {
          this.user.next(res);
        });
    else return;
  }
  getUser() {
    return this.user.asObservable();
  }
}
