import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatIconModule, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private authService: AuthenticationService
  ) {}
  auth: string;
  uid: string;
  password: string;
  retype: string;
  inputType = 'password';
  ngOnInit(): void {
    this.auth = this.router.snapshot.params['auth'];
    this.uid = this.router.snapshot.params['uid'];
  }

  savePassword() {
    if (
      this.auth &&
      this.uid &&
      this.password &&
      this.retype &&
      this.password === this.retype
    )
      this.authService.forgotPassword(this.uid, this.auth, this.password);
  }
  changePasswordVisibility() {
    if (this.inputType === 'password') this.inputType = 'text';
    else this.inputType = 'password';
  }
}
