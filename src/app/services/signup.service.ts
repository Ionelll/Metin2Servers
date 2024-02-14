import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Subject, repeat } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private user = new Subject<UserModel>();
  private role: string = '';
  constructor(private http: HttpClient) {}

  registerUser(userInput: {
    email: string | null;
    password: string | null;
    repeatPassword: string | null;
  }) {
    const { repeatPassword, ...credentials } = userInput;
    if (userInput.password === userInput.repeatPassword) {
      this.http
        .post<UserModel>(
          'https://metins-be.onrender.com/api/register',
          credentials
        )
        .subscribe((res) => {
          this.user.next(res);
        });
    }
  }
}
