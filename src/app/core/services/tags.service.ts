import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private api: ApiService) {}


  public getAll(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    
    
    return this.api.get('/reports/basic', { headers }).pipe(tap((resp)=>{
      
    }))

  }
}
