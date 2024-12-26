import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private api: ApiService) {}

  public getAll() {
    return this.api.get(`/tag/getall`).pipe();
  }

  public create(payload: string) {
    return this.api.post('/Tag/AddTag', payload);
  }
}
