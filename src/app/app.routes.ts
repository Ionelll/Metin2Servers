import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './services/auth.guard';
import { AccountInfoComponent } from './components/dashboard-components/account-info/account-info.component';
import { MyServerComponent } from './components/dashboard-components/my-server/my-server.component';
import { ShareEventComponent } from './components/dashboard-components/share-event/share-event.component';
import { TicketsComponent } from './components/dashboard-components/tickets/tickets.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'security',
        component: AccountInfoComponent,
        data: { animation: 'AccountPage' },
      },
      {
        path: 'server',
        component: MyServerComponent,
        data: { animation: 'ServerPage' },
      },
      {
        path: 'events',
        component: ShareEventComponent,
        data: { animation: 'EventsPage' },
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        data: { animation: 'TicketsPage' },
      },
    ],
    data: { animation: 'ProfilePage' },
  },
  {
    path: 'reset-password/:uid/:auth',
    component: ResetPasswordComponent,
    data: { animation: 'ResetPage' },
  },

  { path: '**', redirectTo: '' },
];
