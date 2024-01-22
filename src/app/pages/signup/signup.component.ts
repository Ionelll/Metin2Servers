import { Component } from '@angular/core';
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
  public registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    role: new FormControl(''),
  });

  registerUser() {
    if (this.registerForm.valid) {
      this.signupService.registerUser(this.registerForm.getRawValue());
    }
  }
}
