import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  private loggedin = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserModel>(undefined);
  private paymentInfo = new BehaviorSubject(undefined);

  login(userInput: { email: string | null; password: string | null }) {
    if (userInput.email && userInput.password)
      this.http
        .post<{ token: string; user_id: string }>(
          `https://metins-be.onrender.com/api/login`,
          userInput
        )
        .subscribe((res) => {
          localStorage.setItem('token', res.token);
          this.loggedin.next(true);
          this.setUser();
          this.setPaymentInfo();
          this.router.navigateByUrl('');
        });
  }
  registerUser(userInput: {
    email: string | null;
    password: string | null;
    repeatPassword: string | null;
  }) {
    const { repeatPassword, ...credentials } = userInput;
    if (userInput.password === userInput.repeatPassword) {
      this.http
        .post('https://metins-be.onrender.com/api/register', credentials)
        .subscribe((res) => {
          if (res) this.router.navigateByUrl('/login');
        });
    }
  }
  setPaymentInfo() {
    this.http
      .get(
        'https://metins-be.onrender.com/api/stripe/promote-subscription-info'
      )
      .subscribe((res) => {
        this.paymentInfo.next(res);
      });
  }
  getPaymentInfo() {
    return this.paymentInfo.asObservable();
  }
  checkToken() {
    this.http
      .get<{ message: string }>(
        'https://metins-be.onrender.com/api/verify-session'
      )
      .subscribe((res) => {
        if (res && res.message === 'Sesion is valid') {
          this.loggedin.next(true);
          this.setUser();
          this.setPaymentInfo();
        } else this.logout();
      });
  }
  setUser() {
    this.http
      .get<UserModel>('https://metins-be.onrender.com/api/user')
      .subscribe((res) => {
        this.user.next(res);
      });
  }
  getUser() {
    return this.user.asObservable();
  }

  setLoggedin(value: boolean) {
    this.loggedin.next(value);
  }
  checkLoggedin() {
    return this.loggedin.asObservable();
  }
  returnLoggedin() {
    if (localStorage.getItem('token')) return true;
    else return false;
  }
  logout() {
    this.loggedin.next(false);
    this.http
      .post('https://metins-be.onrender.com/api/logout', null)
      .subscribe();

    localStorage.removeItem('token');
  }
}
