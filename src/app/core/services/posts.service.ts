import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ipost } from '../models/post';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private api: ApiService) {}

  public readonly baseURL = environment.apiUrl;
  public getAll(take: number, skip: number): Observable<Ipost[]> {
    return this.api.get(`/Post/GetAll?take=${take}&skip=${skip}`).pipe(
      map((resp) => {
        return resp.map((res): Ipost => {
          let thumbnailImg;
          let bodyImg1;
          let avImg: string;
          if (res.userAvatar) {
            avImg = `${this.baseURL}/Image/Download/${res.userAvatar}`;
          } else {
            avImg = './assets/images/avatar/avatar.png';
          }
          if (res.headerImage) {
            const hasHttp = res.headerImage.indexOf('http') !== -1;
            if (!hasHttp) {
              thumbnailImg = `${this.baseURL}/Image/Download/${res.headerImage}`;
              bodyImg1 = `${this.baseURL}/Image/Download/${res.bodyImage}`;
            } else {
              thumbnailImg = res.headerImage;
              bodyImg1 = res.bodyImage;
            }
          } else {
            thumbnailImg = './assets/images/coinkade/coinkade3d.png';
            bodyImg1 = './assets/images/coinkade/coinkade.svg';
          }
          return {
            approximateTime: res.approximateTime,
            author: res.userName,
            authordisplay: res.displayName,
            avatarImg: avImg,
            categoreis: res.categoriesName,
            date: res.createDate,
            description: res.description,
            id: res.id,
            postName: res.postName,
            tags: res.tags,
            Thumbnailimg: thumbnailImg,
            title: res.title,
            body: res.body,
            color: res.color,
            slug: res.postName,
            titleimg: bodyImg1,
          };
        });
      })
    );
  }
  public get(id) {
    return this.api.get(`/Post/GetPostById?postId=${id}`).pipe(
      map((res): Ipost => {
        console.log(res);
        
        let thumbnailImg;
        let bodyImg1;
        let avImg: string;
        if (res.userAvatar) {
          avImg = `${this.baseURL}/Image/Download/${res.userAvatar}`;
        } else {
          avImg = './assets/images/avatar/avatar.png';
        }
        if (res.headerImage) {
          const hasHttp = res.headerImage.indexOf('http') !== -1;
          if (!hasHttp) {
            thumbnailImg = `${this.baseURL}/Image/Download/${res.headerImage}`;
            bodyImg1 = `${this.baseURL}/Image/Download/${res.bodyImage}`;
          } else {
            thumbnailImg = res.headerImage;
            bodyImg1 = res.bodyImage;
          }
        } else {
          thumbnailImg = './assets/images/coinkade/coinkade3d.png';
          bodyImg1 = './assets/images/coinkade/coinkade.svg';
        }
        return {
          approximateTime: res.approximateTime,
          author: res.userName,
          authordisplay: res.displayName,
          avatarImg: avImg,
          categoreis: res.categoriesName,
          date: res.createDate,
          description: res.description,
          id: res.id,
          postName: res.postName,
          tags: res.tags,
          Thumbnailimg: thumbnailImg,
          title: res.title,
          body: res.body,
          color: res.color,
          slug: res.postName,
          titleimg: bodyImg1,
        };
      })
    );
  }
  public create(payload) {
    return this.api.post('/Post/CreatePost', payload);
  }
  public update(payload) {
    return this.api.post('/Post/UpdatePost', payload);
  }
  public delete(id) {
    return this.api.delete(`/post?postId=${id}`);
  }
}
