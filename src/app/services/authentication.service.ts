import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  private loggedin = new BehaviorSubject<boolean>(false);

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
  checkToken() {
    this.http
      .get<{ message: string }>(
        'https://metins-be.onrender.com/api/verify-session'
      )
      .subscribe((res) => {
        if (res && res.message === 'Session is valid') this.loggedin.next(true);
        else {
          this.logout();
        }
      });
  }
  setLoggedin(value: boolean) {
    this.loggedin.next(value);
  }
  checkLoggedin() {
    return this.loggedin.asObservable();
  }
  returnLoggedin() {
    return this.loggedin.value;
  }
  logout() {
    this.http
      .post('https://metins-be.onrender.com/api/logout', 'hello')
      .subscribe();
    localStorage.removeItem('token');
    this.loggedin.next(false);
  }
}
