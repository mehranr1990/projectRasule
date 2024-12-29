import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { DeleteComponent } from '../posts/delete/delete.component';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { ReportsService } from 'src/app/core/services/reports.service';

@Component({
  selector: 'app-reports-courses',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ToastModule,
    ScrollerModule
  ],
  templateUrl: './reports-courses.component.html',
  styleUrl: './reports-courses.component.scss'
})
export class ReportsCoursesComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  courses: any = [];
  constructor(
    private reportService:ReportsService,

  ) {}
  ngOnInit() {
    this.reportService.getAllCourses().subscribe({next:(resp)=>{
      this.courses = resp
    }}) 
  }
}
