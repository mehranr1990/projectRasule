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
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { environment } from 'src/environments/environment';
import { SoldierService } from 'src/app/core/services/soldier.service';
@Component({
  selector: 'app-update-post',
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
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss',
})
export class UpdatePostComponent implements OnInit {
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

  constructor(
    private imageApi: ImageService,
    private categoryservice: CategoriesService,
    private tagservice: TagsService,
    private postservice: PostsService,
    private soldierService:SoldierService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];

    });

    this.soldierService.get(this.id).subscribe({
      next: (resp:any) => {
        console.log(resp);
        
        this.formValues = {
          firstName:resp.firstName,
          lastName:resp.lastName,
          personalNumber:resp.personalNumber,
          fatherName:resp.fatherName,
          birthDate:resp.birthDate,
          birthPlace:resp.birthPlace,
          maritalStatus:resp.maritalStatus,
          address:resp.address,
          phoneNumber:resp.phoneNumber,
          emergencyContact:resp.emergencyContact,
          rank:resp.rank,
          service:resp.service,
          conscriptionStartDate:resp.conscriptionStartDate,
          conscriptionEndDate:resp.conscriptionEndDate,
          photoUrl:resp.photoUrl,
          createdAt:resp.createdAt,
          updatedAt:resp.updatedAt,
        };
        // const sC: any = [];
        // for (let index = 0; index < resp.categoreis.length; index++) {
        //   sC.push({
        //     name: resp.categoreis[index],
        //     code: resp.categoreis[index],
        //   });
        // }
        // const tC: any = [];
        // for (let index = 0; index < resp.tags.length; index++) {
        //   tC.push({
        //     name: resp.tags[index],
        //     code: resp.tags[index],
        //   });
        // }
        // this.selectedCategories = sC;
        // this.selectedTags = tC;

        // this.bodyimageUploaded = true;
        // this.headerimageUploaded = true;

        // this.headerImg = resp.Thumbnailimg;
        // this.bodyImg = resp.titleimg!;

        // this.headerImgSrc = resp.Thumbnailimg;
        // this.bodyImgSrc = resp.titleimg!;

        this.defaultValue = true;
      },
    });

    // this.categoryservice.getAll().subscribe({
    //   next: (resp) => {
    //     for (let index = 0; index < resp.length; index++) {
    //       this.categories.push({
    //         name: resp[index].title,
    //         code: resp[index].title,
    //       });
    //       if (resp[index].categoryEntities.length > 0) {
    //         for (
    //           let index1 = 0;
    //           index1 < resp[index].categoryEntities.length;
    //           index1++
    //         ) {
    //           this.categories.push({
    //             name: resp[index].categoryEntities[index1].title,
    //             code: resp[index].categoryEntities[index1].title,
    //           });
    //         }
    //       }
    //     }
    //   },
    // });
    // this.tagservice.getAll().subscribe({
    //   next: (resp) => {
    //     for (let index = 0; index < resp.length; index++) {
    //       this.tags.push({
    //         name: resp[index].title,
    //         code: resp[index].title,
    //       });
    //     }
    //   },
    // });
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
    form.id = this.id;
    form.headerImage = this.headerImgSrc;
    form.bodyImage = this.bodyImgSrc;
    form.categoriesName = this.selectedCategories.map((resp) => resp.name);
    form.tags = this.selectedTags.map((resp) => resp.name);
    delete form.postName;
    this.postservice.update(form).subscribe({
      next: (resp) => {
        this._router.navigate(['dashboard/posts']);
      },
    });
  }
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
