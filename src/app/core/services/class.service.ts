import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private api: ApiService) {}
  public readonly baseURL = environment.apiUrl;
  public getAll(id) {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .get(`/classes/bycourse/${id}`, { headers })
      .pipe(tap((resp) => {}));
  }
  public create(body) {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api.post(`/classes`, body, { headers }).pipe(tap((resp) => {}));
  }
  public update(id, body) {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .put(`/classes/${id}`, body, { headers })
      .pipe(tap((resp) => {}));
  }

  addSoldierToClass(body) {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .post(`/enrollments`, body, { headers })
      .pipe(tap((resp) => {}));
  }

  enrollments() {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .get(`/enrollments`, { headers })
      .pipe(tap((resp) => {}));
  }
  removeEnrollments(id){
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .delete(`/enrollments/${id}`, { headers })
      .pipe(tap((resp) => {}));
  }



  attendances(body){
    const token = localStorage.getItem('token');
    console.log(token);

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.api
      .post(`/attendances`, body, { headers })
      .pipe(tap((resp) => {
        
      })); 
  }
}
