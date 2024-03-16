import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  changePassword(oldpass: string, newpass: string) {
    this.http
      .post('https://metins-be.onrender.com/api/user/change-password', {
        old_password: oldpass,
        new_password: newpass,
      })
      .subscribe();
  }
}
