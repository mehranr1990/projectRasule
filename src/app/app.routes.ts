import {Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/layout/layout.component').then(({LayoutComponent}) => LayoutComponent),
    loadChildren: () => import('./dashboard/dashboard.routes').then(({routes}) => routes),
    // canActivate: [authGuard],
  },
  {
    path: 'index',
    loadComponent: () => import('./page/index/index.component').then(({IndexComponent}) => IndexComponent),
    loadChildren: () => import('./page/index.routing').then(({routes}) => routes),
  },
  {
    path: '',
    loadComponent: () => import('./auth/layout/layout.component').then(({LayoutComponent}) => LayoutComponent),
    loadChildren: () => import('./auth/auth.routes').then(({routes}) => routes),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/layout/layout.component').then(({LayoutComponent}) => LayoutComponent),
    loadChildren: () => import('./auth/auth.routes').then(({routes}) => routes),
  }

];
