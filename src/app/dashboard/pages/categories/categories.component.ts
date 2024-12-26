import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    EditComponent,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoryservise: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.categoryservise.getAll().subscribe({
      next: (resp) => {
        this.categories = resp;
      },
    });
  }
  categories: any = [];

  deleteCategory(event, Category) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'آیا از حذف این آیتم مطمئن هستید؟',
      header: 'اخطار',
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      accept: () => {
        this.categoryservise.delete(Category.id).subscribe({
          next: (resp) => {
            this.messageService.add({
              severity: 'info',
              summary: 'ایتم با موفقیت حذف گردید',
              detail: resp,
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Rejected',
        //   detail: 'You have rejected',
        //   life: 3000,
        // });
      },
    });
  }
  ViewCategory(Category) {
    if (Category.categoryEntities.length > 0) {
      this.categories = Category.categoryEntities;
    }
  }
  return() {
    this.categoryservise.getAll().subscribe({
      next: (resp) => {
        this.categories = resp;
      },
    });
  }
}
