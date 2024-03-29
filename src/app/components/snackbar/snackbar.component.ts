import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.errorService.getError().subscribe((res: string) => {
      console.log(res);
      this.snackbar.open(res, 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7000,
      });
    });
  }
}
