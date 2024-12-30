
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
import { FormsModule } from '@angular/forms';
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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './soldier.component.html',
  styleUrl: './soldier.component.scss'
})
export class SoldierComponent implements OnInit {
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
    private soldierServicce:SoldierService,

  ) {}
  cols!: any[];
  ngOnInit() {
    this.soldierServicce.getAll().subscribe({next:(resp)=>{
      this.posts = resp
      console.log(resp);
      
    }}) 
    this.cols = [
      { field: 'firstName', header: 'firstName', },
      { field: 'lastName', header: 'lastName' },
      { field: 'personalNumber', header: 'personalNumber' },
      { field: 'service', header: 'service' }
  ];
  }
  editPost(post) {
    console.log(post);
    
    this._router.navigate(['dashboard/soldier/update', post._id]);
  }
  createNewPost() {
    this._router.navigate(['dashboard/soldier/create']);
  }
 
}