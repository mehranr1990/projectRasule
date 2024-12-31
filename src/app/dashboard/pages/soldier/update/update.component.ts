import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import {
  FormFieldSelectData,
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { ImageService } from 'src/app/core/services/image.service';
import { FormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { environment } from 'src/environments/environment';
import { SoldierService } from 'src/app/core/services/soldier.service';
@Component({
  selector: 'app-update',
  // selector: 'app-update-post',
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
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
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
  defaultValue: boolean = false;
  private sub: Subscription;
  id: string;
  maritalType: FormFieldSelectData[] = [
    { label: 'مجرد', value: 'single', icon: '' },
    { label: 'متاهل', value: 'married', icon: '' },
    { label: 'طلاق گرفته', value: 'devorced', icon: '' },
    { label: 'همسر فوت شده', value: 'widowed', icon: '' },
  ];
  constructor(
    private imageApi: ImageService,
    private soldierService: SoldierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];
    });

    this.soldierService.get(this.id).subscribe({
      next: (resp: any) => {
        console.log(resp);

        this.formValues = {
          firstName: resp.firstName,
          lastName: resp.lastName,
          personalNumber: resp.personalNumber,
          fatherName: resp.fatherName,
          birthDate: resp.birthDate,
          birthPlace: resp.birthPlace,
          maritalStatus: resp.maritalStatus,
          address: resp.address,
          phoneNumber: resp.phoneNumber,
          emergencyContact: resp.emergencyContact,
          rank: resp.rank,
          service: resp.service,
          conscriptionStartDate: resp.conscriptionStartDate,
          conscriptionEndDate: resp.conscriptionEndDate,
          photoUrl: resp.photoUrl,
          createdAt: resp.createdAt,
          updatedAt: resp.updatedAt,
        };
       
        this.defaultValue = true;
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
    loading: false,
  };

  public formValues: any;

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
      type: FormFieldType.SELECT,
      name: 'maritalStatus',
      label: 'وضعیت تاهل',
      validations: ['required'],
      extraData: this.maritalType,
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

    const newForm = new FormData();
    for (const property in form) {
      newForm.append(property, form[property]);
    }
    newForm.append('photo', this.image);
    console.log(newForm);
    this.soldierService.update(this.id, newForm).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/posts']);
      },
    });


  }
  image: File;

  headerUploadHandler(resp) {
    console.log(resp.files[0]);
    this.image = resp.files[0];
  }
 
}
