import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, MatIcon, FormsModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  email: string;
  edit_email = false;
  edit_password = false;
  password = '         ';

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.email = res.email;
    });
  }
  editPassword() {
    this.password = null;
  }
  savePassword() {
    this.userService;
  }
}
