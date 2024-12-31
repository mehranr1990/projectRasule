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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-classes',
  standalone: true,
  imports: [
    DatePipe,
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ToastModule,
    ScrollerModule,
  ],
  templateUrl: './reports-classes.component.html',
  styleUrl: './reports-classes.component.scss',
})
export class ReportsClassesComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);

    this.myDiv.filterGlobal(event.target.value, 'contains');
  }

  courses: any = [];
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}
  cols!: any[];
  id: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['courseId'];
    });
    if (this.id) {
      this.reportService.getclassecourse(this.id).subscribe({
        next: (resp) => {
          this.courses = resp;
          console.log(resp);

          this.cols = [
            { field: 'name', header: 'عنوان کلاس' },
            { field: 'startDate', header: 'تاریخ شروع کلاس' },
            { field: 'endDate', header: 'تاریخ پایان کلاس' },
            { field: 'teacher', header: 'اموزگار کلاس' },
          ];
        },
      });
    } else {
      this.reportService.getclassecourse('').subscribe({
        next: (resp) => {
          this.courses = resp;
          this.cols = [
            { field: 'name', header: 'عنوان کلاس' },
            { field: 'startDate', header: 'تاریخ شروع کلاس' },
            { field: 'endDate', header: 'تاریخ پایان کلاس' },
            { field: 'teacher', header: 'اموزگار کلاس' },
          ];
        },
      });
    }
  }
  showatt(course) {
    this._router.navigate(['dashboard/reportsattendance/', course._id]);
  }
  showgrade(course) {
    this._router.navigate(['dashboard/reportsgrade/', course._id]);
  }
  showsoldier(course) {
    this._router.navigate(['dashboard/soldier/', course._id]);
  }
}
