import { Component } from '@angular/core';
import { FormCreatorComponent } from '../shared/form-creator/form-creator.component';
import {
  FormFieldType,
  FormModalField,
} from '../shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [FormCreatorComponent, DialogModule, ButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'fname',
      label: 'نام دسته بندی',
      value: '',
      validations: [],
    },
    {
      type: FormFieldType.TEXT,
      name: 'lname',
      label: 'توضیحات دسته بندی',
      value: '',
      validations: [],
    },
    {
      type: FormFieldType.TEXT,
      name: 'age',
      label: 'آدرس لینک',
      value: '',
      validations: [],
    },
    {
      type: FormFieldType.TEXT,
      name: 'lname',
      label: 'آیدی پدر',
      value: '',
      validations: [],
    },
  ];
  
  submitform(form) {
  }
}
