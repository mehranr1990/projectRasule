
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { FormsModule } from '@angular/forms';
import {environment} from "../../../../environments/environment";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-soldier',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    ScrollerModule,
    TableModule, 
        FormsModule, 
        DatePipe
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './soldier.component.html',
  styleUrl: './soldier.component.scss'
})
export class SoldierComponent implements OnInit {
  public readonly baseURL = environment.photourl
  // @ViewChild('deletecomponent', { static: true })
  // deletepostcomponent: DeleteComponent;
  @ViewChild('dt1') myDiv: any;
  filtermethod2(event) {
    console.log(event.target.value);
    
    this.myDiv.filterGlobal(event.target.value, 'contains')
  }

  posts: any = [];
  constructor(
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private soldierServicce:SoldierService,private route: ActivatedRoute

  ) {}
  cols!: any[];
  id:any
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['soldier'];
      console.log(this.baseURL);
      
    });
    
    if(this.id){
      this.soldierServicce.getsoldercourses(this.id).subscribe({next:(resp)=>{
        console.log(resp);
        this.posts = resp
       if(resp.lenth == 0){
        this.loadfromclassid()
       }
      },error:()=>{
         this.loadfromclassid()
      }}) 
    }else{
      this.soldierServicce.getAll().subscribe({next:(resp)=>{
        
        this.posts = resp

      console.log(resp);
    
    }}) 
  }
    this.cols = [
      { field: 'firstName', header: 'نام', },
      { field: 'lastName', header: 'نام خانوادگی' },
      { field: 'personalNumber', header: 'شماره پرسنلی' },
      { field: 'phoneNumber', header: 'شماره موبایل' },
      { field: 'birthPlace', header: 'محل تولد' },
      { field: 'birthDate', header: 'تاریخ تولد' },
      { field: 'service', header: 'محل خدمت' }
  ];
  }
  editPost(post) {
    console.log(post);
    
    this._router.navigate(['dashboard/soldier/update', post._id]);
  }
  createNewPost() {
    this._router.navigate(['dashboard/soldier/create']);
  }
  loadfromclassid(){
    this.soldierServicce.getsolderclasses(this.id).subscribe({next:(resp)=>{
      console.log(resp);
      
      this.posts = resp
   
    }}) 
  }
}
