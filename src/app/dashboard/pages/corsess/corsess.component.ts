import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corsess',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    EditComponent,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './corsess.component.html',
  styleUrl: './corsess.component.scss',providers: [ConfirmationService, MessageService],
})
export class CorsessComponent implements OnInit {
  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _router: Router,
  ) {}
  categories: any = [];
  
  cols!: any[];
  ngOnInit() {
   this.getActiveCourses()
   this.cols = [
    { field: 'title', header: 'title', },
    { field: 'startDate', header: 'startDate' },
    { field: 'endDate', header: 'endDate' },
];
  }
getActiveCourses(){
  this.coursesService.getAllActiveCourses().subscribe({
    next: (resp) => {
      this.categories = resp;
    },
  });
}

@ViewChild('dt1') myDiv: any;
filtermethod2(event) {
  console.log(event.target.value);
  
  this.myDiv.filterGlobal(event.target.value, 'contains')
}
  ViewCategory(Category) {
    this._router.navigate(['dashboard/class/', Category._id]);

  }
  archiveCourses(Category){
      this.confirmationService.confirm({
      message: 'آیا از ارشیو کردن این آیتم مطمئن هستید؟',
      header: 'اخطار',
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      accept: () => {
        this.coursesService.archiveCourse(Category._id).subscribe({
          next: (resp) => {

            this.getActiveCourses() 
            this.messageService.add({
              severity: 'info',
              summary: 'ایتم با موفقیت ارشیو گردید',
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
  return() {
    this.coursesService.getAllCourses().subscribe({
      next: (resp) => {
        this.categories = resp;
      },
    });
  }
}
