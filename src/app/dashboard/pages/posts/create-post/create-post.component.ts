import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import {
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { ImageService } from 'src/app/core/services/image.service';
import { FormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { PostsService } from 'src/app/core/services/posts.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { CardModule } from 'primeng/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormCreatorComponent,
    FileUploadModule,
    ImageModule,
    FormsModule,
    MultiSelectModule,
    FloatLabelModule,
    CardModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit {
  categories: any = [];
  tags: any = [];
  selectedTags: any = [];
  selectedCategories;
  bodyImgSrc: string;
  headerImgSrc: string;
  bodyImg: string;
  headerImg: string;
  bodyimageUploaded: boolean = false;
  headerimageUploaded: boolean = false;
  constructor(
    private imageApi: ImageService,
    private categoryservice: CategoriesService,
    private tagservice: TagsService,
    private postservice: PostsService,
    private userStore:UserStore
  ) {}
  ngOnInit() {
    this.categoryservice.getAll().subscribe({
      next: (resp) => {
        for (let index = 0; index < resp.length; index++) {
          this.categories.push({
            name: resp[index].title,
            code: resp[index].title,
          });
          if (resp[index].categoryEntities.length > 0) {
            for (
              let index1 = 0;
              index1 < resp[index].categoryEntities.length;
              index1++
            ) {
              this.categories.push({
                name: resp[index].categoryEntities[index1].title,
                code: resp[index].categoryEntities[index1].title,
              });
            }
          }
        }
      },
    });
    this.tagservice.getAll().subscribe({
      next: (resp) => {
        for (let index = 0; index < resp.length; index++) {
          this.tags.push({
            name: resp[index].title,
            code: resp[index].title,
          });
        }
      },
    });
  }
  resetUploadHeaderPic() {
    this.headerimageUploaded = false;
    this.headerImg = '';
    this.headerImgSrc = '';
  }

  
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: true,
  };
  formFields: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'firstName',
      label: 'نام',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'lastName',
      label: 'نام خانوادگی',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'fatherName',
      label: 'نام پدر',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.NUMBER,
      name: 'personalNumber',
      label: 'شماره پرسنلی',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.DATE,
      name: 'birthDate',
      label: 'تاریخ تولد',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'birthPlace',
      label: 'محل تولد',
      validations: ['required'],
      value: '',
    },
   

    {
      type: FormFieldType.TEXT,
      name: 'maritalStatus',
      label: 'وضعیت تاهل',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'address',
      label: 'آدرس محل سکونت',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.NUMBER,
      name: 'phoneNumber',
      label: 'شماره تماس',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.NUMBER,
      name: 'emergencyContact',
      label: 'شماره تماس اضطراری',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'rank',
      label: 'درجه نظامی',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.TEXT,
      name: 'service',
      label: 'واحد خدمتی',
      validations: ['required'],
      value: '',
    },
    {
      type: FormFieldType.DATE,
      name: 'conscriptionStartDate',
      label: 'تاریخ شروع خدمت',
      validations: ['required'],
      value: '',
    },
    
    {
      type: FormFieldType.DATE,
      name: 'conscriptionEndDate',
      label: 'تاریخ پایان خدمت',
      validations: ['required'],
      value: '',
    },
    
    {
      type: FormFieldType.EDITOR,
      name: 'body',
      label: 'Editor',
      validations: ['required'],
      value: '',
    },
  ];

  submitForm(form) {
    
    console.log(form);
    
    
    form.headerImage = this.headerImgSrc;
    form.categoriesName = this.selectedCategories.map((resp) => resp.name);
    this.postservice.create(form).subscribe({
      next: (resp) => {
        this.resetUploadHeaderPic();
        this.selectedCategories = [];
        this.formValues = {
        
        };
      },
    });
  }
  public formValues: any;

  headerUploadHandler(resp) {
    const formData = new FormData();
    formData.append('file', resp.files[0]);
    this.imageApi.upload(formData).subscribe({
      next: (resp) => {
        this.headerimageUploaded = true;
        this.headerImgSrc = resp.body;
        this.headerImg = `${environment.apiUrl}/Image/Download/${resp.body}`;
      },
    });
  }

 
}
