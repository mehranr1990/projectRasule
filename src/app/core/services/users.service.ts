import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: ApiService) {}
  public readonly baseURL = environment.apiUrl;
  public get(name: string) {
    return this.api.get(`/User/GetUserByUserName?userName=${name}`).pipe(
      map((resp) => {
        let thumbnailImg;
        if (resp.imageName) {
          thumbnailImg = `${this.baseURL}/Image/Download/${resp.imageName}`;
        } else {
          thumbnailImg = './assets/images/coinkade/coinkade3d.png';
        }
        
        return {
          name: resp.name,
          userName: resp.userName,
          email: resp.email,
          phoneNumber: resp.phoneNumber,
          telegram: resp.telegram,
          instagram: resp.instagram,
          linkdin: resp.linkdin,
          twitter: resp.twitter,
          description: resp.description,
          imageName:thumbnailImg,
          id:resp.id

        };
        
      })
    );
  }

  public update(id, payload) {
    return this.api.post(`/User/UpdateProfile?userId=${id}`, payload);
  }
}
