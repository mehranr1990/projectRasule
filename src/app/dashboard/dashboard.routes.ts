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
    path: 'soldier',
    loadChildren: () =>
      import('./pages/soldier/soldier.routes').then(({ routes }) => routes),
  },

 
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/corsess/corsess.component').then(
        ({ CorsessComponent }) => CorsessComponent
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
