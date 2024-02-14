import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private signupService: SignupService) {}
  password: string = '';
  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repeatPassword: new FormControl('', Validators.required),
  });

  registerUser() {
    if (this.registerForm.valid) {
      this.signupService.registerUser(this.registerForm.getRawValue());
    }
  }
}
