import { Component, Input } from '@angular/core';
import { FormFieldType, FormModalField } from 'src/app/components/shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ImageModule,ButtonModule,DialogModule,FormCreatorComponent,FileUploadModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  constructor(private categoryservise:CategoriesService){}
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
      label: 'دوره',
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
      type: FormFieldType.TEXT,
      name: 'slug',
      label: 'تاریخ شروع دوره',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'link',
      label: 'تاریخ پایان دوره',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'parentId',
      label: 'آیدی دوره',
      value: '',
      validations: ['required'],
    },
  ];
  
  submitform(form) {
    this.categoryservise.create(form).subscribe({next:(resp)=>{
      this.visible =false
      
    }})
  }
}
