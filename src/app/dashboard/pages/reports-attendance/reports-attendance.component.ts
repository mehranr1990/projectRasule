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
import { environment } from 'src/environments/environment';

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
  ],
  templateUrl: './reports-attendance.component.html',
  styleUrl: './reports-attendance.component.scss',
})
export class ReportsAttendanceComponent {
  
  public readonly photoUrl = environment.photourl
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);

    this.myDiv.filterGlobal(event.target.value, 'contains');
  }

  attendance: any = [];
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute
  ) {}
  cols!: any[];
  id: any;
 async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['courseId'];
    });
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
          if(resp.length == 0){
            this.loadfromclassId()
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
  loadfromclassId(){
    if(this.attendance.length == 0){
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
}
