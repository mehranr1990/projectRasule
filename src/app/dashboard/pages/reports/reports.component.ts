import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { DeleteComponent } from '../posts/delete/delete.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { ReportsService } from 'src/app/core/services/reports.service';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    ScrollerModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  courses: any = [];
  constructor(
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reportService:ReportsService,

  ) {}
  ngOnInit() {
    this.reportService.getAllCourses().subscribe({next:(resp)=>{
      this.courses = resp
    }}) 
  }
  editPost(post) {
    console.log(post);
    
    this._router.navigate(['dashboard/posts/update', post._id]);
  }
 
  viewPost(post: Ipost) {
    window.open(`https://blog.coinkade.com/${post.postName}`, '_blank');
  }
  createNewPost() {
    this._router.navigate(['dashboard/posts/create']);
  }
  viewcomments(post){
    this._router.navigate(['dashboard/comments/', post.id]);
  }
}
