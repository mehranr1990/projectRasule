import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        ({LoginComponent}) => LoginComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        ({ LoginComponent }) => LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        ({ RegisterComponent }) => RegisterComponent
      ),
  },
];
