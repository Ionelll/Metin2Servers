import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { CountryFlags } from '../../../models/country-flags';
import { ErrorService } from '../../../services/error.service';
import { MatIconModule } from '@angular/material/icon';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-my-server',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './my-server.component.html',
  styleUrl: './my-server.component.scss',
})
export class MyServerComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private authService: AuthenticationService,
    private errorService: ErrorService,
    private serverService: ServerService
  ) {}
  countryFlags = CountryFlags;
  paymentInfo: any;
  logoChanged = false;
  activeImage: string;
  imageFile: File;
  international = false;
  disableLanguages = false;
  server = new FormGroup({
    name: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    maxLevel: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl(
      new Date().toISOString().split('T')[0],
      Validators.required
    ),
    playerBase: new FormControl('', Validators.required),
    languages: new FormArray([new FormControl('')]),
    focus: new FormControl(''),
  });

  redirectPayment() {
    this.paymentService.redirectToPayment();
  }
  ngOnInit(): void {
    this.authService.getPaymentInfo().subscribe((res) => {
      this.paymentInfo = res;
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.logoChanged = true;
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      this.imageFile = file;
      reader.onload = () => {
        this.activeImage = reader.result as string;
      };
    }
  }
  changeInternational() {
    if (this.international) {
      this.server.controls.languages.clear();
      this.server.controls.languages.push(
        new FormControl('../../../../assets/international.png')
      );
      this.disableLanguages = true;
    } else {
      this.disableLanguages = false;
      this.server.controls.languages.clear();
      this.server.controls.languages.push(new FormControl(''));
    }
  }
  saveServer() {
    let addServer = new FormData();
    console.log(JSON.stringify(['asd']));
    addServer.append('name', this.server.controls.name.value);
    addServer.append('website', this.server.controls.website.value);
    addServer.append('max_level', this.server.controls.maxLevel.value);
    addServer.append('category', this.server.controls.category.value);
    addServer.append('release_date', this.server.controls.releaseDate.value);
    addServer.append('player_base', this.server.controls.playerBase.value);
    addServer.append('focus', this.server.controls.focus.value);
    addServer.append(
      'languages',
      JSON.stringify(this.server.controls.languages.value)
    );
    if (this.logoChanged) addServer.append('banner', this.imageFile);
    this.serverService.saveServer(addServer);
  }
  addLanguage() {
    if (this.server.controls.languages.length < 5)
      this.server.controls.languages.push(new FormControl(''));
    else
      this.errorService.setError(
        'Choose international if your server supports more than 5 languages'
      );
  }
  removeLanguage(i) {
    this.server.controls.languages.removeAt(i);
  }
}
