import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { ReportsService } from 'src/app/core/services/reports.service';

@Component({
  selector: 'app-reports-grade',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, ToastModule, ScrollerModule],
  templateUrl: './reports-grade.component.html',
  styleUrl: './reports-grade.component.scss',
})
export class ReportsGradeComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);

    this.myDiv.filterGlobal(event.target.value, 'contains');
  }
  Grades: any = [];
  constructor(private reportService: ReportsService) {}
  cols!: any[];

  ngOnInit() {
    this.reportService.getAllGrades().subscribe({
      next: (resp) => {
        console.log(resp);
        
        resp.filter(res=>{
          if(res.enrollment){

            this.Grades.push(res);
          }
        })
      },
    });
     this.cols = [
      { field: 'firstName', header: 'firstName', },
      { field: 'lastName', header: 'lastName' },
      { field: 'score', header: 'score' },
      { field: 'personalNumber', header: 'personalNumber' },
      { field: 'classType', header: 'classType' },
      { field: 'note', header: 'note' },
  ];
  }
}
