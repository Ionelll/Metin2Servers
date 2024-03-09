import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-my-server',
  standalone: true,
  imports: [],
  templateUrl: './my-server.component.html',
  styleUrl: './my-server.component.scss',
})
export class MyServerComponent {
  constructor(private paymentService: PaymentService) {}

  redirectPayment() {
    this.paymentService.redirectToPayment();
  }
}
