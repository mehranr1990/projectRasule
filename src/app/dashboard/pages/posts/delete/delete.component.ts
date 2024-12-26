import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ToastModule, InputTextModule, FormsModule, ConfirmDialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class DeleteComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private postservise: PostsService
  ) {}
 public openConfirm(category) {

    this.confirmationService.confirm({
      
      
      header: category.id,
      message: 'آیا از حذف سرباز مطمئن هستید؟',
      accept: () => {
        console.log(category.id);
        
        this.postservise.delete(category.id).subscribe({
          next: (resp) => {
            this.messageService.add({
              severity: 'info',
              summary: 'سرباز با موفقیت حذف شد',
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
}
