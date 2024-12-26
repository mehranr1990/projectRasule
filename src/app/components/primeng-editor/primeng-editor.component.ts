import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {ImageHandler, Options} from 'ngx-quill-upload';
import {lastValueFrom} from 'rxjs';
import {ApiService} from 'src/app/core/services/api.service';
import Quill from 'quill';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-primeng-editor',
  standalone: true,
  imports: [QuillModule, FormsModule],
  templateUrl: './primeng-editor.component.html',
  styleUrl: './primeng-editor.component.scss',
})
export class PrimengEditorComponent {
  activateRTL(editor: any) {
    editor.format('align', 'right');
    // editor.format('direction', 'rtl');
  }

  constructor(private api: ApiService) {
  }

  modules = {
    imageHandler: {
      upload: (file) => {
        return new Promise(async (resolve, reject) => {
          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            const uploadData = new FormData();
            uploadData.append('file', file, file.name);
            try {
              const resp = await lastValueFrom(this.api.post('', uploadData));
              resolve(
                //TODO
                'https://eramblog.com/img/1695198186_3294857.jpg'
              );
            } catch (error) {
              console.error('Error:', error);
              reject('Upload failed');
            }
          } else {
            reject('Unsupported type');
          }
        });
      },
      accepts: ['png', 'jpg', 'jpeg', 'jfif'],
    } as Options,
    // videoHandler: {
    //   upload: (file) => {
    //     return; // your uploaded video URL as Promise<string>
    //   },
    //   accepts: ['mpeg', 'avi'], // Extensions to allow for videos (Optional) | Default - ['mp4', 'webm']
    // } as Options,
  };
}
