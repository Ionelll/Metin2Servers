import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ServerModel } from '../../../../../models/server.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { style, transition, trigger, animate } from '@angular/animations';
import { ServerService } from '../../../../../services/server.service';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './server-card.component.html',
  styleUrl: './server-card.component.scss',
  // animations: [
  //   trigger('slide', [
  //     transition(':enter', [
  //       style({ transform: 'translateY(-100%)' }),
  //       animate(
  //         '0.3s 0.2s ease',
  //         style({
  //           transform: 'translateY(0)',
  //         })
  //       ),
  //     ]),
  //     transition(':leave', [
  //       animate('0.3s ease', style({ transform: 'translateY(-100%)' })),
  //     ]),
  //   ]),
  // ],
})
export class ServerCardComponent implements OnInit {
  @Input() item: ServerModel;
  @Input() rating: number;
  public rate = 0;
  public hover: boolean;
  public media: boolean;
  public showRating = false;
  private sub = new Subscription();

  constructor(
    private serverService: ServerService,
    private authService: AuthenticationService
  ) {
    if (window.innerWidth < 1000) this.media = true;
    else this.media = false;

    if (this.media) {
      this.hover = true;
    }
  }

  ngOnInit(): void {
    this.item.release_date = this.item.release_date
      .split('-')
      .reverse()
      .join('.');

    this.sub = this.authService.checkLoggedin().subscribe((res) => {
      this.showRating = res;
    });
  }

  linkToWebsite(link: string) {
    window.open(link, '_blank');
  }

  mouseLeave() {
    if (this.media) this.hover = true;
    else this.hover = false;
  }

  setRating(value: number) {
    this.serverService.setRating(value, this.item.server_id);
    this.item.user_rating = value;
  }
}
