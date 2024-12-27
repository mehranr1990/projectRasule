import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private api: ApiService) { }
  public readonly baseURL = environment.apiUrl;
  createCourse(payload){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    return this.api.post(`/courses`,payload, { headers }).pipe(tap((resp)=>{  
    }))
  }
  public getAllActiveCourses(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    
    return this.api.get('/courses', { headers }).pipe(tap((resp)=>{
      
    }))

  }
  public getAllCourses(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    
    return this.api.get('/courses/all', { headers }).pipe(tap((resp)=>{
      
    }))

  }
  archiveCourse(id){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    return this.api.put(`/courses/archive/${id}`,"", { headers }).pipe(tap((resp)=>{  
    }))
  }
}
