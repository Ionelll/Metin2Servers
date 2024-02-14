import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  public user = new BehaviorSubject<UserModel>(undefined);

  login(userInput: { email: string | null; password: string | null }) {
    if (userInput.email && userInput.password)
      this.http
        .post<UserModel>(`https://metins-be.onrender.com/api/login`, userInput)
        .subscribe((res) => {
          this.user.next(res);
        });
  }
  getUser() {
    return this.user.asObservable();
  }
}
