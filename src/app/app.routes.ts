import { Routes } from '@angular/router';
import { LoginComponent, HomeComponent } from './views';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Spotify Stats',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  }
];
