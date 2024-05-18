import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { PaymentInfo } from '../models/payment-info.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  private loggedin = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserModel>(undefined);
  private paymentInfo = new BehaviorSubject<PaymentInfo>(undefined);

  login(userInput: { email: string | null; password: string | null }) {
    if (userInput.email && userInput.password)
      this.http
        .post<{ token: string; user_id: string }>(
          `https://metinsbe-production.up.railway.app/api/login`,
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
        .post(
          'https://metinsbe-production.up.railway.app/api/register',
          credentials
        )
        .subscribe((res) => {
          if (res) this.router.navigateByUrl('/login');
        });
    }
  }
  setPaymentInfo() {
    this.http
      .get<PaymentInfo>(
        'https://metinsbe-production.up.railway.app/api/stripe/promote-subscription-info'
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
        'https://metinsbe-production.up.railway.app/api/verify-session'
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
      .get<UserModel>('https://metinsbe-production.up.railway.app/api/user')
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
    this.user.next(undefined);
    this.http
      .post('https://metinsbe-production.up.railway.app/api/logout', null)
      .subscribe();

    localStorage.removeItem('token');
  }
  resetPassword(userEmail: { email: string }) {
    this.http
      .post(
        ' https://metinsbe-production.up.railway.app/api/forgot-password',
        userEmail
      )
      .subscribe();
  }
  forgotPassword(uid: string, auth: string, password: string) {
    uid = uid.replace('uid', '');
    this.http
      .post(
        `https://metinsbe-production.up.railway.app/api/reset-password/${uid}/${auth}/`,
        {
          new_password: password,
        }
      )
      .subscribe((res) => {
        if (res) this.router.navigateByUrl('login');
      });
  }
}
