import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { ReportsService } from 'src/app/core/services/reports.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private reportService: ReportsService,
    private route: ActivatedRoute) {}
  cols!: any[];
id:any
  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      this.id = params['courseId'];
    });
    if(this.id){
      this.reportService.getgradecourse(this.id).subscribe({
        next: (resp) => {
  
          for (let index = 0; index < resp.length; index++) {
         
          
            switch (resp[index].passOrFail) {
              case 'none':
                resp[index].passOrFail = 'نامشخص'
                break;
                case 'pass':
                resp[index].passOrFail = 'قبول'
                
                break;
                case 'fail':
                resp[index].passOrFail = 'مردود'
                
                break;
               
            
              default:
                break;
            }
          }
          if(resp.length==0){
            this.loadfromclassId()
          }
          resp.filter(res=>{
            if(res.enrollment){
  
              this.Grades.push(res);
            }
          })
        },
      });
       this.cols = [
        { field: 'enrollment.soldier.firstName', header: 'نام', },
        { field: 'enrollment.soldier.lastName', header: 'نام خانوادگی'  },
        { field: 'score', header: 'نمره' },
        { field: 'enrollment.soldier.personalNumber', header: 'شماره پرسنلی' },
        { field: 'enrollment.class.name', header: 'نام کلاس' },
        { field: 'enrollment.class.course.title', header: 'نام دوره' },
        { field: 'passOrFail', header: 'وضعیت' },
        { field: 'note', header: 'توضیحات' },
    ];
    }else{
      this.reportService.getgradecourse('').subscribe({
        next: (resp) => {
  
          for (let index = 0; index < resp.length; index++) {
         
          
            switch (resp[index].passOrFail) {
              case 'none':
                resp[index].passOrFail = 'نامشخص'
                break;
                case 'pass':
                resp[index].passOrFail = 'قبول'
                
                break;
                case 'fail':
                resp[index].passOrFail = 'مردود'
                
                break;
               
            
              default:
                break;
            }
          }
          
          resp.filter(res=>{
            if(res.enrollment){
  
              this.Grades.push(res);
            }
          })
        },
      });
       this.cols = [
        { field: 'enrollment.soldier.firstName', header: 'نام', },
        { field: 'enrollment.soldier.lastName', header: 'نام خانوادگی'  },
        { field: 'score', header: 'نمره' },
        { field: 'enrollment.soldier.personalNumber', header: 'شماره پرسنلی' },
        { field: 'enrollment.class.name', header: 'نام کلاس' },
        { field: 'enrollment.class.course.title', header: 'نام دوره' },
        { field: 'passOrFail', header: 'وضعیت' },
        { field: 'note', header: 'توضیحات' },
    ];
    }
    
  }
  loadfromclassId(){
    this.reportService.getgradeclasses(this.id).subscribe({
      next: (resp) => {

        for (let index = 0; index < resp.length; index++) {
       
        
          switch (resp[index].passOrFail) {
            case 'none':
              resp[index].passOrFail = 'نامشخص'
              break;
              case 'pass':
              resp[index].passOrFail = 'قبول'
              
              break;
              case 'fail':
              resp[index].passOrFail = 'مردود'
              
              break;
             
          
            default:
              break;
          }
        }
        
        resp.filter(res=>{
          if(res.enrollment){

            this.Grades.push(res);
          }
        })
      },
    });
     this.cols = [
      { field: 'enrollment.soldier.firstName', header: 'نام', },
      { field: 'enrollment.soldier.lastName', header: 'نام خانوادگی'  },
      { field: 'score', header: 'نمره' },
      { field: 'enrollment.soldier.personalNumber', header: 'شماره پرسنلی' },
      { field: 'enrollment.class.name', header: 'نام کلاس' },
      { field: 'enrollment.class.course.title', header: 'نام دوره' },
      { field: 'passOrFail', header: 'وضعیت' },
      { field: 'note', header: 'توضیحات' },
  ];
  }
}
