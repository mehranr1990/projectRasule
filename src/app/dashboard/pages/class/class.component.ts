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
import { EditComponent } from '../categories/edit/edit.component';
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
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    EditComponent,
    CardModule,
    DialogModule,
    FormCreatorComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ClassComponent implements OnInit {
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
  classes: any;
  private sub;
  id: string;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];
    });
    this.getclasess();
  }
  getclasess() {
    this.classService.getAll(this.id).subscribe({
      next: (resp: any) => {
        this.classes = resp;
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
    console.log(form);
    
    const body = {
      enrollmentId: this.enrolments1._id,
      sessionDate: new Date(),
      status: form.status,
      description:form.description
    };
    this.classService.attendances(body).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'تایید',
          detail: `وضعیت سرباز ${
            this.enrolments1.soldier.firstName + ' ' + this.enrolments1.soldier.lastName
          } ثبت شد`,
          life: 3000,
        });
      },
    });

  }
  visibleform:boolean=false
  enrolments1:any
  setStatusAttendances(enrolments){
    this.visibleform = true
    this.visible2 = false
    this.enrolments1 = enrolments
  }
}
