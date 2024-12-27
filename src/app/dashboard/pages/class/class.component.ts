import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from '../class/create/create.component';
import { EditComponent } from '../categories/edit/edit.component';
import { ClassService } from 'src/app/core/services/class.service';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    EditComponent,
    CardModule,
    ConfirmDialogModule,
    ToastModule,],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ClassComponent implements OnInit{
constructor(private classService:ClassService,
  private route: ActivatedRoute,){
}
classes:any
private sub;
id: string;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];

    });
    this.classService.getAll(this.id).subscribe({
      next: (resp:any) => {
          this.classes = resp
      }})
  }
}
