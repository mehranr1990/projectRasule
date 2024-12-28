import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: ApiService) {}
  public readonly baseURL = environment.apiUrl;
  public getAll() {
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.get(`/users`, { headers })
  }
  public get(id) {
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.get(`/users/${id}`, { headers })
  }
  public delete(id) {
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.delete(`/users/${id}`, { headers })
  }
  public update(id,payload) {
    const token = localStorage.getItem('token')
    console.log(token);
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });  
    return this.api.put(`/users/${id}`,payload, { headers })
  }
  public activate(id) {
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.patch(`/users/${id}/activate`,'', { headers })
  }
  public deActivate(id) {
    console.log(id);
    
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.patch(`/users/${id}/deactivate`,'' , { headers })
  }

  public create(payload) {
    console.log(payload);
    
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api.post(`/users/register`, payload, { headers });
  }

}
