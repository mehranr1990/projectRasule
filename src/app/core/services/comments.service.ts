import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private api: ApiService) {}

  public getAll() {
    return this.api.get(`/Comment/GetUnkownComment`).pipe();
  }
  public get(id:string) {
    return this.api.get(`/Comment/GetComments?postid=${id}`);
  }
  
  public update(id,status) {
    return this.api.post('/Comment/ChangeStatusComment',{id, status});
  }
  
}
