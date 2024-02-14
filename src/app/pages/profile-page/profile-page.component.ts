import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(private userService: UserService) {}
  public user: UserModel;
  public edit: boolean;
  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }
}
