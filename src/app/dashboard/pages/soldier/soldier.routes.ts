import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./soldier.component').then(({ SoldierComponent }) => SoldierComponent),
  },
  {
    path: ':soldier',
    loadComponent: () =>
      import('./soldier.component').then(({ SoldierComponent }) => SoldierComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/create.component').then(
        ({ CreateComponent }) => CreateComponent
      ),
  },
  {
    path: 'update/:postId',
    loadComponent: () =>
      import('./update/update.component').then(
        ({ UpdateComponent }) => UpdateComponent
      ),
  },
];

