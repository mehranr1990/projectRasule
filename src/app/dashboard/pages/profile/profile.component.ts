import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { UsersService } from 'src/app/core/services/users.service';
import { UpdateComponent } from './update/update.component';
import { UserStore } from 'src/app/core/stores/user.store';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CoursesService } from 'src/app/core/services/courses.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CreateComponent } from './create/create.component';
import {
  FormFieldSelectData,
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from 'src/app/components/shared/form-creator/form-creator.model';
import { DialogModule } from 'primeng/dialog';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
    FormCreatorComponent,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ProfileComponent implements OnInit {
  users: any;
  constructor(
    private profileservise: UsersService,
    private userStore: UserStore,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _router: Router
  ) {}
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  cols!: any[];
  ngOnInit() {
    this.getusers();
    this.cols = [
      { field: 'username', header: 'نام کاربری', },
      { field: 'role', header: 'نقش کاربر' },
      { field: 'isActive', header: 'فعال یا غیر فعال' },
  ];
  }
  getusers() {
    this.profileservise.getAll().subscribe({
      next: (resp) => {
        this.users = resp;
      },
    });
  }
  ViewCategory(Category) {
    this._router.navigate(['dashboard/class/', Category._id]);
  }

  archiveCourses(user) {
    this.confirmationService.confirm({
      message: 'آیا از به روزرسانی وضعیت این کاربر مطمئن هستید؟',
      header: 'اخطار',
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'فعال کردن',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'غیرفعال کردن',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      accept: () => {
        this.profileservise.activate(user._id).subscribe({
          next: (resp) => {
            this.getusers();
            this.messageService.add({
              severity: 'success',
              summary: 'کاربر با موفقیت فعال گردید',
              detail: resp,
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        this.profileservise.deActivate(user._id).subscribe({
          next: (resp) => {
            this.getusers();
            this.messageService.add({
              severity: 'error',
              summary: 'کاربر با موفقیت غیرفعال گردید',
              detail: resp,
              life: 3000,
            });
          },
        });
      },
    });
  }
  visible: boolean = false;
  defaultValue: boolean = false;
  public formValues: any;
  classID: any;
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: false,
  };
  editClass(classData) {
    this.classID = classData._id;
    this.visible = true;
    this.formValues = {
      username: classData.username,
      password: classData.password,
      role: classData.role,
    };
    this.defaultValue = true;
  }
  usersType: FormFieldSelectData[] = [
    { label: 'ادمین', value: 'admin', icon: '' },
    { label: 'استاد', value: 'teacher', icon: '' },
  ];
  public formFeilds: FormModalField[] = [
    {
      type: FormFieldType.TEXT,
      name: 'username',
      label: 'نام کاربری',
      value: '',
      validations: ['required'],
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
      extraData: this.usersType,
      validations: ['required'],
    },
  ];

  submitform(form) {
    this.profileservise.update(this.classID, form).subscribe({
      next: (resp) => {
        this.getusers();
        this.visible = false;
      },
    });
  }
  delete(user) {
    this.profileservise.delete(user._id).subscribe({
      next: (resp) => {
        this.confirmationService.confirm({
          message: 'آیا از حذف این کاربر مطمئن هستید؟',
          header: 'اخطار',
          icon: 'fa-regular fa-circle-exclamation text-amber-500',
          acceptIcon: 'none',
          rejectIcon: 'none',
          acceptLabel: 'تایید',
          acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
          rejectLabel: 'رد',
          rejectButtonStyleClass: 'text-slate-500 pe-5',
          accept: () => {
            this.getusers();
            this.messageService.add({
              severity: 'error',
              summary: 'کاربر با موفقیت حذف گردید',
              detail: resp,
              life: 3000,
            });
          },
        });
      },
    });
  }
}
