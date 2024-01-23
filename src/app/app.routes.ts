import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MainContentComponent } from './components/main-content/component/main-content.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: '',
    component: LandingPageComponent,
    children: [{ path: '', component: MainContentComponent }],
    data: { animation: 'LandingPage' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { animation: 'SignupPage' },
  },
  { path: '**', redirectTo: '' },
];
