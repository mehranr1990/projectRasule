import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private api: ApiService) {}
  public getAllCourses() {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .get('/reports/courses', { headers })
      .pipe(tap((resp) => {}));
  }
  public getAllClasses() {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .get('/reports/classes', { headers })
      .pipe(tap((resp) => {}));
  }
  public getAllGrades() {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api.get('/reports/grades', { headers }).pipe(tap((resp) => {}));
  }
  public getAllattendance() {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .get('/reports/attendance', { headers })
      .pipe(tap((resp) => {}));
  }
}
