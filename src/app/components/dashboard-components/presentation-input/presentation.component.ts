import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../services/server.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-presentation-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationInputComponent implements OnInit {
  constructor(
    private server: ServerService,
    private userService: AuthenticationService
  ) {}

  presentation: string;
  serverId: string;

  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.serverId = res.servers[0].server_id;
    });
  }
  save() {
    let pachedServer = new FormData();
    pachedServer.append('presentation', this.presentation);
    this.server.patchServer(pachedServer, this.serverId);
  }
}
