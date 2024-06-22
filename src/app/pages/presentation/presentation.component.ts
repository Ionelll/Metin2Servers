import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { ServerModel } from '../../models/server.model';
import { MatIconModule } from '@angular/material/icon';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent implements OnInit {
  server_id: string;
  server: ServerModel;
  constructor(
    private router: ActivatedRoute,
    private serverService: ServerService,
    private snackbar: ErrorService
  ) {
    this.server_id = this.router.snapshot.paramMap.get('server_id');
  }

  ngOnInit(): void {
    this.serverService.setServer(this.server_id);
    this.serverService.getServer().subscribe((res) => {
      this.server = res;
    });
  }
  copyLink() {
    navigator.clipboard.writeText(this.server.website);
    this.snackbar.setError('copyLink', ['Link Copied !']);
  }
}
