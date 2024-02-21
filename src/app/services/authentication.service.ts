import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userInput: { email: string | null; password: string | null }) {
    if (userInput.email && userInput.password)
      this.http
        .post<string>(`https://metins-be.onrender.com/api/login`, userInput)
        .subscribe((res) => {
          localStorage.setItem('token', res);
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
}
