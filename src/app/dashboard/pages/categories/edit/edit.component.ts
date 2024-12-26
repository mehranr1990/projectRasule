import { Component, Input, OnInit } from '@angular/core';
import {
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ImageService } from 'src/app/core/services/image.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormCreatorComponent,
    ColorPickerModule,
    FormsModule,
    FileUploadModule,
    ImageModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  constructor(
    private imageApi: ImageService,
    private categoryservice: CategoriesService
  ) {}
  ngOnInit() {
    this.categoryservice.get(this.category.slug).subscribe({
      next: (resp) => {
        
        this.formValues = {
          title: resp.title,
          description: resp.description,
          link: resp.link,
          parentId: resp.parentId,
        };
        this.imageSrc = resp.bgImage;
        this.imageUploaded = true;
        this.defaultvalue = true;
      },
    });
  }
  @Input() category: any;
  visible: boolean;
  imageSrc: string;
  imgSrc: string;
  defaultvalue: boolean = false;
  color: string | undefined;
  showDialog() {
    this.visible = true;
  }
  resetUploadimageSrc() {
    this.imageUploaded = false;
    this.imageSrc = '';
    this.imgSrc = '';
  }
  imageUploaded: boolean = false;
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: false,
  };
  public formValues: any;
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'title',
      label: 'نام دسته بندی',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'description',
      label: 'توضیحات دسته بندی',
      value: '',
      validations: ['required'],
    },
    // {
    //   type: FormFieldType.TEXT,
    //   name: 'slug',
    //   label: 'آدرس لینک',
    //   value: '',
    //   validations: ['required'],
    // },
    {
      type: FormFieldType.TEXT,
      name: 'link',
      label: 'آدرس لینک',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'parentId',
      label: 'آیدی پدر',
      value: '',
      validations: ['required'],
    },
  ];
  submitEditForm(form) {
    console.log(form);
    
    form.color = this.color;
    form.bgImage = this.imgSrc;
    this.categoryservice.update(this.category.id, form).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }

  uploadHandler(resp) {
    const formData = new FormData();
    formData.append('file', resp.files[0]);
    console.log(resp.file);
    this.imageApi.upload(formData).subscribe({
      next: (resp) => {
        this.imageUploaded = true;
        this.imgSrc = resp.body;
        this.imageSrc = `${environment.apiUrl}/Image/Download/${resp.body}`;
      },
    });
  }
}
