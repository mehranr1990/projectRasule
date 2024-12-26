import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/index/index.component').then(
        ({ IndexComponent }) => IndexComponent
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./pages/posts/posts.routes').then(({ routes }) => routes),
  },

  {
    path: 'comments/:postId',
    loadComponent: () =>
      import('./pages/comments/comments.component').then(
        ({ CommentsComponent }) => CommentsComponent
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./pages/comments/comments.component').then(
        ({ CommentsComponent }) => CommentsComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        ({ CategoriesComponent }) => CategoriesComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        ({ ProfileComponent }) => ProfileComponent
      ),
  },
  // {
  //   loadComponent: () => import('./pages/index/index.component').then(({IndexComponent}) => IndexComponent)
  // },
  {
    path: 'default',
    loadComponent: () => import('./pages/default/default.component').then(({DefaultComponent}) => DefaultComponent)
  }
];
