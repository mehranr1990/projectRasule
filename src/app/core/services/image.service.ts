import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private api: ApiService) {}

  public get(filename) {
    return this.api.getFile(`/Image/Download/${filename}`);
  }

  public upload(payload) {
    return this.api.postFile('/Image/UploadFile', payload);
  }
 
}
