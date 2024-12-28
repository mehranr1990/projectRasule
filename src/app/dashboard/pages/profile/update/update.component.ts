import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';
import { asapScheduler, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-update',
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
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  constructor(
    private imageApi: ImageService,
    private profileservice: UsersService,
    private _router: Router
  ) {}
  @Input() profile: any;
  @Output() profileChange :any = new EventEmitter<any>();
  id: string = '';
  showmodal: boolean = false;
  ngOnInit() {
    this.id = this.profile.id;
    this.formValues = this.profile;

    this.imageSrc = this.profile.imageName;
    this.showmodal = true;
  }
  visible: boolean;
  imageSrc: string;
  imgSrc: string;
  showDialog() {
    this.visible = !this.visible;
    this.formOptions.loading = false;
  }
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: true,
  };

  public formValues: any;

  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'name',
      label: 'نام ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'userName',
      label: 'نام کاربری ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'email',
      label: 'ایمیل ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'phoneNumber',
      label: 'شماره همراه ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'telegram',
      label: 'تلگرام ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'instagram',
      label: 'اینستاگرام ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'linkdin',
      label: 'لینک دین',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'twitter',
      label: 'توییتر ',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.TEXT,
      name: 'description',
      label: 'توضیحات ',
      value: '',
      validations: ['required'],
    },
  ];
  submitform(form) {
    form.imageName = this.imgSrc;
    this.profileservice.update(this.id, form).subscribe({
      next: async () => {
        this.profile = await lastValueFrom(this.profileservice.get(this.profile.userName!));
        console.log(this.profile);
        this.profileChange.emit(this.profile)
        this.visible = !this.visible;
      },
    });
  }
 
}
