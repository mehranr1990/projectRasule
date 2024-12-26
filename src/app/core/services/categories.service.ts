import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { ICategory } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private api: ApiService) {}

  public readonly baseURL = environment.apiUrl;
  public getAll() {
    return this.api.get(`/Category/GetAll`).pipe(
      map((resp) => {
        return resp.map((res): ICategory => {
          let bgImage1;
          
          if (res.bgImage) {
            bgImage1 = `${this.baseURL}/Image/Download/${res.bgImage}`;
          } else {
            bgImage1= './assets/images/coinkade/coinkade3d.png';
          }
          return {
            categoryEntities: res.categoryEntities,
            count: res.count,
            id: res.id,
            link: res.link,
            title: res.title,
            bgImage: bgImage1,
            color: res.color,
            description: res.description,
            parentId: res.parentId,
            slug: res.slug,
          };
        });
      })
    );
  }
  public get(title: string) {
    return this.api.get(`/Category/GetCategoryBySlug?slug=${title}`).pipe(map((resp)=>{
      let bgImage1;
      if (resp.bgImage) {
        bgImage1 = `${this.baseURL}/Image/Download/${resp.bgImage}`;
      } else {
        bgImage1= './assets/images/coinkade/coinkade3d.png';
      }
      
      return {
        categoryEntities: resp.categoryEntities,
        count: resp.count,
        id: resp.id,
        link: resp.link,
        title: resp.title,
        bgImage: bgImage1,
        color: resp.color,
        description: resp.description,
        parentId: resp.parentId,
        slug: resp.slug,
      };
    }))
  }

  public create(payload) {
    return this.api.post('/Category/CreateCategory', payload);
  }
  // title, link, description, parentId, color, bgImage, slug
  public update(id, payload) {
    return this.api.post(`/Category/updateCategory?id=${id}`, payload);
  }
  // id: number, title: string, description: string, link: string
  public delete(id) {
    return this.api.delete(`/Category/DeleteCategory?id=${id}`);
  }
}
