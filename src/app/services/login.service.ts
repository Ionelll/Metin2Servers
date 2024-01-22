import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  public user = new BehaviorSubject<{ name: string; role: string }>({
    name: '',
    role: '',
  });

  login(userInput: { email: string | null; password: string | null }) {
    this.user.next({ name: 'asd', role: 'asd' });
  }
}
