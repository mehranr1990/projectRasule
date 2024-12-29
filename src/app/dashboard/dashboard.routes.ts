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
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        ({ CategoriesComponent }) => CategoriesComponent
      ),
  },
  {
    path: 'reportscourses',
    loadComponent: () =>
      import('./pages/reports-courses/reports-courses.component').then(
        ({ ReportsCoursesComponent }) => ReportsCoursesComponent
      ),
  },
  {
    path: 'reportsclasses',
    loadComponent: () =>
      import('./pages/reports-classes/reports-classes.component').then(
        ({ ReportsClassesComponent }) => ReportsClassesComponent
      ),
  },
  {
    path: 'reportsgrade',
    loadComponent: () =>
      import('./pages/reports-grade/reports-grade.component').then(
        ({ ReportsGradeComponent }) => ReportsGradeComponent
      ),
  },
  {
    path: 'reportsattendance',
    loadComponent: () =>
      import('./pages/reports-attendance/reports-attendance.component').then(
        ({ ReportsAttendanceComponent }) => ReportsAttendanceComponent
      ),
  },
  {
    path: 'class/:postId',
    loadComponent: () =>
      import('./pages/class/class.component').then(
        ({ ClassComponent }) => ClassComponent
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
