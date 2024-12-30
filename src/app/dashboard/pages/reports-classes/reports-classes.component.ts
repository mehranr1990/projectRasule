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
    ScrollerModule
  ],
  templateUrl: './reports-classes.component.html',
  styleUrl: './reports-classes.component.scss'
})
export class ReportsClassesComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  courses: any = [];
  constructor(
    private reportService:ReportsService,

  ) {}
  cols!: any[];

  ngOnInit() {
    this.reportService.getAllCourses().subscribe({next:(resp)=>{
      this.courses = resp
       this.cols = [
      { field: 'title', header: 'title', },
      { field: 'startDate', header: 'startDate' },
      { field: 'endDate', header: 'endDate' },
      { field: 'description', header: 'description' },
  ];
    }}) 
  }
}