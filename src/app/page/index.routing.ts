import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./index/index.component').then(({IndexComponent}) => IndexComponent)
  },
];

