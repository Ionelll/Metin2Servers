import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  public user: UserModel;
  ngOnInit(): void {
    // this.authService.getUser().subscribe((res: UserModel) => {
    //   this.user = res;
    // });
  }
}
