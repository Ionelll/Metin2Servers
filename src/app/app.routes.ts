import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: '',
    component: LandingPageComponent,
    data: { animation: 'LandingPage' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { animation: 'SignupPage' },
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    data: { animation: 'ProfilePage' },
  },

  { path: '**', redirectTo: '' },
];
