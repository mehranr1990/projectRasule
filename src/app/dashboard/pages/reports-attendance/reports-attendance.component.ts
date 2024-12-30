import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { ReportsService } from 'src/app/core/services/reports.service';


@Component({
  selector: 'app-reports-attendance',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ToastModule,
    ScrollerModule
  ],
  templateUrl: './reports-attendance.component.html',
  styleUrl: './reports-attendance.component.scss'
})
export class ReportsAttendanceComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  attendance: any = [];
  constructor(
    private reportService:ReportsService,

  ) {}
    cols!: any[];

  ngOnInit() {
    this.reportService.getAllattendance().subscribe({next:(resp)=>{
      this.attendance = resp
      console.log(resp);
       this.cols = [
      { field: 'firstName', header: 'firstName', },
      { field: 'lastName', header: 'lastName' },
      { field: 'personalNumber', header: 'personalNumber' },
      { field: 'classType', header: 'classType' },
      { field: 'description', header: 'description' },
  ];
    }}) 
  }
}