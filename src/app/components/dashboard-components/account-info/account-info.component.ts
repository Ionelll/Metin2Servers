import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, MatIcon, FormsModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  email: string;

  edit_password = false;
  oldPassword: string;
  newPassword: string;
  private userSub = new Subscription();

  ngOnInit(): void {
    this.userSub = this.authService.getUser().subscribe((res) => {
      this.email = res?.email;
    });
  }
  savePassword() {
    this.userService.changePassword(this.oldPassword, this.newPassword);
    this.oldPassword = '';
    this.newPassword = '';
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
