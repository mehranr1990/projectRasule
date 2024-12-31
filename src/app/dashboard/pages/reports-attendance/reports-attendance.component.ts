import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DialogModule } from 'primeng/dialog';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { FileUploadModule } from 'primeng/fileupload';
import {
  FormFieldSelectData,
  FormFieldType,
  FormModalField,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-reports-attendance',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ToastModule,
    ScrollerModule,
    DialogModule,
    FormCreatorComponent,
    FileUploadModule,
    ConfirmDialogModule
  ],
  templateUrl: './reports-attendance.component.html',
  styleUrl: './reports-attendance.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReportsAttendanceComponent {
  public readonly photoUrl = environment.photourl;
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);

    this.myDiv.filterGlobal(event.target.value, 'contains');
  }

  attendance: any = [];
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}
  cols!: any[];
  id: any;
   ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['courseId'];
    });
    this.loaddata()
  }
  async loaddata(){
    if (this.id) {
      await this.reportService.getattendancecourse(this.id).subscribe({
        next: (resp) => {
          for (let index = 0; index < resp.length; index++) {
            switch (resp[index].status) {
              case 'late':
                resp[index].status = 'تاخیر';
                break;
              case 'present':
                resp[index].status = 'حاضر';

                break;
              case 'absent':
                resp[index].status = 'غایب';

                break;
              case 'excused':
                resp[index].status = 'معاف';

                break;
              case 'other':
                resp[index].status = 'دیگر';

                break;

              default:
                break;
            }
          }
          this.attendance = resp;
          if (resp.length == 0) {
            this.loadfromclassId();
          }
        },
      });
      this.cols = [
        { field: 'firstName', header: 'firstName' },
        { field: 'lastName', header: 'lastName' },
        { field: 'personalNumber', header: 'personalNumber' },
        { field: 'classType', header: 'classType' },
        { field: 'description', header: 'description' },
      ];
    } else {
      this.reportService.getattendancecourse('').subscribe({
        next: (resp) => {
          for (let index = 0; index < resp.length; index++) {
            switch (resp[index].status) {
              case 'late':
                resp[index].status = 'تاخیر';
                break;
              case 'present':
                resp[index].status = 'حاضر';

                break;
              case 'absent':
                resp[index].status = 'غایب';

                break;
              case 'excused':
                resp[index].status = 'معاف';

                break;
              case 'other':
                resp[index].status = 'دیگر';

                break;

              default:
                break;
            }
          }
          this.attendance = resp;
          console.log(resp);
          this.cols = [
            { field: 'firstName', header: 'firstName' },
            { field: 'lastName', header: 'lastName' },
            { field: 'personalNumber', header: 'personalNumber' },
            { field: 'classType', header: 'classType' },
            { field: 'description', header: 'description' },
          ];
        },
      });
    }
  }
  loadfromclassId() {
    if (this.attendance.length == 0) {
      console.log(this.attendance);
      console.log(this.attendance.length);

      this.reportService.getattendanceclasses(this.id).subscribe({
        next: (resp) => {
          for (let index = 0; index < resp.length; index++) {
            switch (resp[index].status) {
              case 'late':
                resp[index].status = 'تاخیر';
                break;
              case 'present':
                resp[index].status = 'حاضر';

                break;
              case 'absent':
                resp[index].status = 'غایب';

                break;
              case 'excused':
                resp[index].status = 'معاف';

                break;
              case 'other':
                resp[index].status = 'دیگر';

                break;

              default:
                break;
            }
          }
          this.attendance = resp;
        },
      });
      this.cols = [
        { field: 'firstName', header: 'firstName' },
        { field: 'lastName', header: 'lastName' },
        { field: 'personalNumber', header: 'personalNumber' },
        { field: 'classType', header: 'classType' },
        { field: 'description', header: 'description' },
      ];
    }
  }
  visibleform: boolean = false;

  attid;
  attendances: FormFieldSelectData[] = [
    { label: 'حاضر', value: 'present', icon: '' },
    { label: 'غایب', value: 'absent', icon: '' },
    { label: 'تأخیر', value: 'late', icon: '' },
    { label: 'معاف', value: 'excused', icon: '' },
    { label: 'دیگر', value: 'other', icon: '' },
  ];
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
      status: form.status,
      description: form.description,
    };
    console.log(body);

    const newForm = new FormData();
    for (const property in body) {
      console.log(property);

      newForm.append(property, body[property]);
      console.log(newForm);
    }

    newForm.append('attachment', this.image);

    this.reportService.changeatt(this.attid, newForm).subscribe({
      next: () => {

        this.loaddata()
        this.messageService.add({
          severity: 'info',
          summary: 'تایید',
          detail: `وضعیت سرباز 
           ثبت شد`,
          life: 3000,
        });
      },
    });
  }
  image: File;

  headerUploadHandler(resp) {
    console.log(resp.files[0]);
    this.image = resp.files[0];
  }
  editatt(att) {
    this.attid =att._id
    this.visibleform = true
    
  }
  deleteatt(att) {
    
    this.confirmationService.confirm({
      message: 'آیا از حذف کردن این رکورد مطمئن هستید؟',
      header: 'اخطار',
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      accept: () => {
        this.reportService.deleteatt(att._id).subscribe({
          next: (resp) => {

            this.loaddata()
            this.messageService.add({
              severity: 'info',
              summary: 'رکورد با موفقیت حذف گردید',
              detail: resp,
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Rejected',
        //   detail: 'You have rejected',
        //   life: 3000,
        // });
      },
    });
  }
}
