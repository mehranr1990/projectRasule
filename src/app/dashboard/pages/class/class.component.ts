import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from '../class/create/create.component';
import { ClassService } from 'src/app/core/services/class.service';
import { DialogModule } from 'primeng/dialog';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import {
  FormFieldSelectData,
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    DatePipe,
    ButtonModule,
    TableModule,
    CreateComponent,
    CardModule,
    DialogModule,
    FormCreatorComponent,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    FileUploadModule,
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ClassComponent implements OnInit {
  
  @ViewChild('dt1') myDiv: any;
  @ViewChild('dt2') myDiv2: any;
  @ViewChild('dt3') myDiv3: any;
  filtermethod2(event) {
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }
  filtermethod3(event) {
    
    this.myDiv2.filterGlobal(event.target.value, 'contains')
  }
  filtermethod4(event) {
    
    this.myDiv3.filterGlobal(event.target.value, 'contains')
  }
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private soldierServices: SoldierService
  ) {}
  classType: FormFieldSelectData[] = [
    { label: 'تئوری', value: 'theory', icon: '' },
    { label: 'عملی', value: 'parctical', icon: '' },
    { label: 'کارگاه', value: 'workshop', icon: '' },
  ];
  attendances: FormFieldSelectData[] = [
    { label: 'حاضر', value: 'present', icon: '' },
    { label: 'غایب', value: 'absent', icon: '' },
    { label: 'تأخیر', value: 'late', icon: '' },
    { label: 'معاف', value: 'excused', icon: '' },
    { label: 'دیگر', value: 'other', icon: '' },
  ];
  gradeType: FormFieldSelectData[] = [
    { label: 'قبول', value: 'pass', icon: '' },
    { label: 'مردود', value: 'fail', icon: '' },
    { label: 'نامشخص', value: 'none', icon: '' },
  ];
  classes: any;
  private sub;
  id: string;
  cols!: any[];
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];
    });
    this.getclasess();
    this.cols = [
      { field: 'title', header: 'title', },
      { field: 'startDate', header: 'startDate' },
      { field: 'endDate', header: 'endDate' },
      { field: 'classType', header: 'classType' },
      { field: 'capacity', header: 'capacity' },
      { field: 'teacher', header: 'teacher' }
  ];
  }
  image: File;

  headerUploadHandler(resp) {
    console.log(resp.files[0]);
    this.image = resp.files[0];
  }
  getclasess() {
    this.classService.getAll(this.id).subscribe({
      next: (resp: any) => {
        for (let index = 0; index < resp.classes.length; index++) {
          console.log(resp.classes[index].classType);
          
          switch (resp.classes[index].classType) {
            
            case 'theory':  
            console.log('sadf');
            
            resp.classes[index].classType = 'تئوری'
            console.log(resp);
            
            break;
            case 'parctical':  
            resp.classes[index].classType = 'عملی'
            break;
            case 'workshop':  
            resp.classes[index].classType = 'کارگاه'
              break;
          
            default:
              break;
          }
          
        }

        
        this.classes = resp.classes;

        
      },
    });
  }
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: false,
  };
  visible: boolean;
  visible1: boolean;
  get imageUploaded(): boolean {
    // return !!this.addCoinFormGroup.value.image;
    return false;
  }

  defaultValue: boolean = false;
  public formValues: any;
  classID: any;
  editClass(classData) {
    this.classID = classData._id;
    this.visible = true;
    this.formValues = {
      classType: classData.classType,
      capacity: classData.capacity,
      description: classData.description,
    };
    this.defaultValue = true;
  }
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.SELECT,
      name: 'classType',
      label: 'نوع کلاس',
      extraData: this.classType,
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
      label: 'توضیحات درباره کلاس',
      value: '',
      validations: ['required'],
    },
  ];

  submitform(form) {
    this.classService.update(this.classID, form).subscribe({
      next: (resp) => {
        this.getclasess();
        this.visible = false;
      },
    });
  }
  soldier: any;
  classId: any;
  addSoldier(event) {
    console.log(event);
    this.classId = event._id;
    this.visible1 = true;
    this.soldierServices.getAll().subscribe({
      next: (resp) => {
        this.soldier = resp;
      },
    });
  }
  addtoclass(soldeier) {
    const body = {
      soldier: soldeier._id,
      class: this.classId,
    };
    console.log(body);

    this.classService.addSoldierToClass(body).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'تایید',
          detail: `سرباز ${
            soldeier.firstName + ' ' + soldeier.lastName
          } به کلاس اضافه شد`,
          life: 3000,
        });
      },
    });
  }
  visible2: boolean = false;
  enrollmentsinclass: any = [];
  async ViewEnrollments(classData) {
    this.visible2 = true;
    this.classService.enrollments().subscribe({
      next: (resp) => {
        this.enrollmentsinclass = [];
        resp.filter((res) => {
          if (res.class._id == classData._id && res.isActive) {
            this.enrollmentsinclass.push(res);
          }
        });
      },
    });
  }

  removefromclass(enrolments) {
    this.classService.removeEnrollments(enrolments._id).subscribe({
      next: () => {
        this.ViewEnrollments(enrolments.class);
        this.messageService.add({
          severity: 'error',
          summary: 'تایید',
          detail: `سرباز ${
            enrolments.soldier.firstName + ' ' + enrolments.soldier.lastName
          } از کلاس حذف شد`,
          life: 3000,
        });
      },
    });
  }
  presentInClass(enrolments) {
    const body = {
      enrollmentId: enrolments._id,
      sessionDate: new Date(),
      status: 'present',
    };
    this.classService.attendances(body).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'تایید',
          detail: `حضور به موقع سرباز ${
            enrolments.soldier.firstName + ' ' + enrolments.soldier.lastName
          } ثبت شد`,
          life: 3000,
        });
      },
    });
  }
  absentInClass(enrolments) {
    const body = {
      enrollmentId: enrolments._id,
      sessionDate: new Date(),
      status: 'absent',
    };
    this.classService.attendances(body).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'تایید',
          detail: `غیبت سرباز ${
            enrolments.soldier.firstName + ' ' + enrolments.soldier.lastName
          } ثبت شد`,
          life: 3000,
        });
      },
    });
  }

  public formFeilds1: FormModalField[] = [
    {
      type: FormFieldType.SELECT,
      name: 'status',
      label: 'وضعیت حضور',
      extraData: this.attendances,
      value: '',
      validations: ['required'],
    },
    // {
    //   type: FormFieldType.NUMBER,
    //   name: 'capacity',
    //   label: 'ظرفیت کلاس',
    //   value: '',
    //   validations: ['required'],
    // },
    {
      type: FormFieldType.TEXT,
      name: 'description',
      label: 'توضیحات درباره تاخیر یا غیبت',
      value: '',
      validations: ['required'],
    },
  ];
  submitform1(form) {

    const body = {
      enrollmentId: this.enrolments1._id,
      sessionDate: new Date(),
      status: form.status,
      description: form.description,
    };
    const newForm = new FormData();
    for (const property in body) {
      newForm.append(property, form[property]);
    }
    newForm.append('photo', this.image);
    console.log(newForm);
    this.classService.attendances(newForm).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'تایید',
          detail: `وضعیت سرباز ${
            this.enrolments1.soldier.firstName +
            ' ' +
            this.enrolments1.soldier.lastName
          } ثبت شد`,
          life: 3000,
        });
      },
    });
  }
  visibleform: boolean = false;
  enrolments1: any;
  setStatusAttendances(enrolments) {
    this.visibleform = true;
    this.visible2 = false;
    this.enrolments1 = enrolments;
  }

  setGrade(enrolments) {
    this.visiblegrade = true;
    this.visible2 = false;
    this.enrolments1 = enrolments;
  }

  public formFeildsgrade: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'score',
      label: 'نمره',
      value: '',
      validations: ['required'],
    },
    {
      type: FormFieldType.SELECT,
      name: 'passOrFail',
      label: 'وضعیت قبولی یا مردودی',
      extraData: this.gradeType,
      value: '',
      validations: ['required'],
    },
    // {
    //   type: FormFieldType.NUMBER,
    //   name: 'capacity',
    //   label: 'ظرفیت کلاس',
    //   value: '',
    //   validations: ['required'],
    // },
    {
      type: FormFieldType.TEXT,
      name: 'note',
      label: 'توضیحات درباره نمره',
      value: '',
      validations: ['required'],
    },
  ];
  submitformgrade(form) {
    console.log(form);

    const body = {
      enrollmentId: this.enrolments1._id,
      score: form.score,
      passOrFail: form.passOrFail,
      note: form.note,
    };
    this.soldierServices.setgrade(body).subscribe({
      next: () => {
        this.visiblegrade = false;
    this.visible2 = true;
        this.messageService.add({
          
          severity: 'info',
          summary: 'تایید',
          detail: `نمره ${form.score} برای سرباز ${
            this.enrolments1.soldier.firstName +
            ' ' +
            this.enrolments1.soldier.lastName
          } ثبت شد`,
          life: 3000,
        });
      },
    });
  }
  visiblegrade: boolean = false;
  grade: any;
}
