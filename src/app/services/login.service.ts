import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  public user = new Subject<{ name: string; email: string; role: string }>();

  login(userInput: { email: string | null; password: string | null }) {
    this.user.next({ email: 'asd', name: 'asd', role: 'asd' });
  }
}
