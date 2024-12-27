import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoldierService {

  constructor(private api: ApiService) { }
  public readonly baseURL = environment.apiUrl;
  public getAll(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    
    return this.api.get('/soldiers', { headers }).pipe(tap((resp)=>{
      
    }))

  }
  get(id){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    return this.api.get(`/soldiers/${id}`, { headers }).pipe(tap((resp)=>{  
    }))
  }
  create(body){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    return this.api.post(`/soldiers`, body,{ headers }).pipe(tap((resp)=>{  
    }))
  }

  getbycourse(id){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    return this.api.get(`/soldiers/bycourse/${id}`, { headers }).pipe(tap((resp)=>{  
    }))
  }


}
