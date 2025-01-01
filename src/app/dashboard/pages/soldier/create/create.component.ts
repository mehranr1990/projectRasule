import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { UserStore } from 'src/app/core/stores/user.store';
import { CardModule } from 'primeng/card';
import { environment } from 'src/environments/environment';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CameraService } from 'src/app/core/services/camera.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormCreatorComponent,
    FileUploadModule,
    ImageModule,
    FormsModule,
    MultiSelectModule,
    FloatLabelModule,
    CardModule,
    DialogModule,
    CommonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
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
  maritalType: FormFieldSelectData[] = [
    { label: 'مجرد', value: 'single', icon: '' },
    { label: 'متاهل', value: 'married', icon: '' },
    { label: 'طلاق گرفته', value: 'devorced', icon: '' },
    { label: 'همسر فوت شده', value: 'widowed', icon: '' },
  ];
  constructor(
    private cameraService: CameraService,
    private categoryservice: CategoriesService,
    private soldierService: SoldierService,
    private userStore: UserStore
  ) {}
  ngOnInit() {      this.startCamera();
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

    // form.headerImage = this.headerImgSrc;
    // form.categoriesName = this.selectedCategories.map((resp) => resp.name);
    this.soldierService.create(newForm).subscribe({
      next: (resp) => {
        this.resetUploadHeaderPic();
        this.selectedCategories = [];
        this.formValues = {};
      },
    });
  }

  public formValues: any;

  image: File;

  headerUploadHandler(resp) {
    console.log(resp.files[0]);
    this.image = resp.files[0];
  }
  visible: boolean = false;
 
  showDialog() {
    this.visible = !this.visible;
  }
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;
  private stream1: MediaStream;
  videoElement: HTMLVideoElement | undefined;
  imageUrl: string = '';
  async startCamera() {
    this.starCamera()
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    const stream = await this.cameraService.startCamera();
    
    if (stream && this.videoElement) {
      this.videoElement.srcObject = stream;
    }
  }
  async starCamera(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.stream1 = stream;
      this.video.nativeElement.srcObject = stream;
      this.drawToCanvas();
    } catch (error) {
      console.error('خطا در دسترسی به دوربین: ', error);
    }
  }
  drawToCanvas(): void {
    const video = this.video.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    
    // رسم فریم به فریم ویدیو روی کانواس
    const drawFrame = () => {
      if (video.paused || video.ended) return;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    drawFrame(); // شروع رسم فریم‌ها روی کانواس
  }
  // توقف دوربین
  stopCamera() {
    this.cameraService.stopCamera();
  }
  // گرفتن عکس
  capture() {
    if (this.videoElement) {
      this.imageUrl = this.cameraService.captureImage(this.videoElement);

       const fileType = this.imageUrl.split(';')[0].split(':')[1];

    // Remove the Base64 prefix "data:image/png;base64," if present
    const base64Data = this.imageUrl.split(',')[1];

    // Convert Base64 string to a binary Blob
    const byteCharacters = atob(base64Data);
    const byteArrays :any= [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    let file :any = new File([blob], `soldierpicture${blob.size}.png`,{ type: 'image/jpeg' });
    console.log(file.type);
    
    this.image = file
    console.log(file);
    
    // Create a download link for the user

    // Clean up the URL object
    }
  }
 
}
