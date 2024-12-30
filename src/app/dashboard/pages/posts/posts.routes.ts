import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./posts.component').then(({ PostsComponent }) => PostsComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create-post/create-post.component').then(
        ({ CreatePostComponent }) => CreatePostComponent
      ),
  },
  {
    path: 'update/:postId',
    // data: {some_data: 2},
    loadComponent: () =>
      import('./update-post/update-post.component').then(
        ({ UpdatePostComponent }) => UpdatePostComponent
      ),
  },
];

