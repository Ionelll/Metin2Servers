import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient, private router: Router) {}

  redirectToPayment() {
    this.http
      .post<{ checkout_url: string }>(
        'https://metins-be.onrender.com/api/stripe/promote-subscription-checkout?success_url=https://metin2servers.pages.dev/profile/server?success=success&cancel_url=https://metin2servers.pages.dev/profile/server?success=cancel',
        null
      )
      .subscribe((res) => {
        window.location.replace(res.checkout_url);
      });
  }
}
