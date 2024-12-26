import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommentsService } from 'src/app/core/services/comments.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class CommentsComponent implements OnInit {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private commentsApi: CommentsService,
    
    private route: ActivatedRoute,
  ) {}
  
  private sub: Subscription;
  id: string;
  ngOnInit() {
    this.commentsApi.getAll().subscribe({
      next: (resp) => {
        this.comments = resp;
      },
    });
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];

      
this.commentsApi.get(this.id).subscribe({
      next: (resp) => {
        this.comments = resp;
      },
    });
      
    });

  }

  value: string;

  comments: any[] = [];
  viewComments(comment) {
    this.confirmationService.confirm({
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectVisible:false,
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',

      header: comment.id,
      message: comment.text,
      accept: () => {
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: 'You have accepted',
        //   life: 3000,
        // });
      },
      // reject: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Rejected',
      //     detail: 'You have rejected',
      //     life: 3000,
      //   });
      // },
    });
  }
  postid() {
    this.commentsApi.get(this.value).subscribe({
      next: (resp) => {
        this.comments = resp;
      },
    });
  }
  confirm(comment) {
    this.confirmationService.confirm({
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      header: comment.id,
      message: comment.text,
      accept: () => {
        this.commentsApi.update(comment.id, true).subscribe({
          next: (resp) => {
            this.messageService.add({
              severity: 'info',
              summary: 'تایید',
              detail: 'نظر تایید گردید',
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        this.commentsApi.update(comment.id, false).subscribe({
          next: (resp) => {
            this.messageService.add({
              severity: 'error',
              summary: 'رد شده',
              detail: 'نظر رد شد',
              life: 3000,
            });
          },
        });
      },
    });
  }
}
