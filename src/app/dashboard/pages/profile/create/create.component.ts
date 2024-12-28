import { Component, Input } from '@angular/core';
import { FormFieldSelectData, FormFieldType, FormModalField } from 'src/app/components/shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Validators } from '@angular/forms';
import { CoursesService } from 'src/app/core/services/courses.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ImageModule,ButtonModule,DialogModule,FormCreatorComponent,FileUploadModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  constructor(private userServices:UsersService){}
   visible: boolean;
   get imageUploaded(): boolean {
    // return !!this.addCoinFormGroup.value.image;
    return false
  }
  usersType: FormFieldSelectData[] = [
    { label: 'ادمین', value: 'admin', icon: '' },
    { label: 'استاد', value: 'teacher', icon: '' },
  ];
  showDialog() {
    this.visible = true;
  }
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'username',
      label: 'نام کاربری',
      value: '',
      validations: ['required',],
    },
    {
      type: FormFieldType.PASSWORD,
      name: 'password',
      label: 'کلمه عبور',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.SELECT,
      name: 'role',
      label: 'نقش',
      value: '',
      extraData:this.usersType,
      validations: ['required'],
    },
  ];
  
  submitform(form) {
    this.userServices.create(form).subscribe({next:(resp)=>{
      this.visible =false
      
    }})
  }
}
