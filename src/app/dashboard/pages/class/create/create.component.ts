import { Component, Input, OnInit } from '@angular/core';
import { FormFieldType, FormModalField } from 'src/app/components/shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Validators } from '@angular/forms';
import { ClassService } from 'src/app/core/services/class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ImageModule,ButtonModule,DialogModule,FormCreatorComponent,FileUploadModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  constructor(private classService:ClassService,private route: ActivatedRoute){}
  sub:any
  id:any
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];
      
    });
  }
   visible: boolean;
   get imageUploaded(): boolean {
    // return !!this.addCoinFormGroup.value.image;
    return false
  }
  showDialog() {
    this.visible = true;
  }
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'title',
      label: 'عنوان دوره',
      value: '',
      validations: ['required',],
    },
    // {
    //   type: FormFieldType.TEXT,
    //   name: 'description',
    //   label: 'توضیحات دسته بندی',
    //   value: '',
    //   validations: ['required'],
    // },
    {
      type: FormFieldType.DATE,
      name: 'startDate',
      label: 'تاریخ شروع دوره',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.DATE,
      name: 'endDate',
      label: 'تاریخ پایان دوره',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'teacher',
      label: 'نام مدرس کلاس',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.NUMBER,
      name: 'capacity',
      label: 'ظرفیت کلاس',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'description',
      label: 'توضیحات درباره دوره',
      value: '',
      validations: ['required'],
    },
  ];
  
  submitform(form) {
    form.course = this.id
    this.classService.create(form).subscribe({next:(resp)=>{
      this.visible =false
    }})
  }
}
