import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink } from '@angular/router';

import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private errorService: ErrorService
  ) {}
  public loginInput = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  login() {
    this.authService.login(this.loginInput.getRawValue());
  }
  resetPassword() {
    if (this.loginInput.controls.email.valid) {
      this.authService.resetPassword({
        email: this.loginInput.controls.email.value,
      });
      this.errorService.setError('', [
        'An email has beent sent to your adress.',
      ]);
    } else
      this.errorService.setError('', [
        'Please enter your email in the email field below, then click "Forgot my password".',
      ]);
  }
}
