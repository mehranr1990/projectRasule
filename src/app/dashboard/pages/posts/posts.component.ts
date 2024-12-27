import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PostsService } from 'src/app/core/services/posts.service';
import { CardModule } from 'primeng/card';
import { Ipost } from 'src/app/core/models/post';
import { Router } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { DeleteComponent } from '../posts/delete/delete.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { SoldierService } from 'src/app/core/services/soldier.service';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogComponent,
    CardModule,
    CreatePostComponent,
    DeleteComponent,
    ConfirmDialogModule,
    ToastModule,
    ScrollerModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  // @ViewChild('deletecomponent', { static: true })
  // deletepostcomponent: DeleteComponent;
  posts: any = [];
  constructor(
    private postservice: PostsService,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private soldierServicce:SoldierService,

    private postservise: PostsService
  ) {}
  ngOnInit() {
    this.soldierServicce.getAll().subscribe({next:(resp)=>{
      this.posts = resp
    }}) 
  }
  editPost(post) {
    console.log(post);
    
    this._router.navigate(['dashboard/posts/update', post._id]);
  }
  deletePost(post) {
    // this.deletepostcomponent.openConfirm(post);
    this.confirmationService.confirm({
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'تایید',
      acceptButtonStyleClass: 'bg-sky-700 text-sky-100',
      rejectLabel: 'رد',
      rejectButtonStyleClass: 'text-slate-500 pe-5',
      header: post.id,
      message: 'آیا از حذف مقاله مطمئن هستید؟',
      accept: () => {
        this.postservise.delete(post.id).subscribe({
          next: (resp) => {

            this.messageService.add({
              severity: 'info',
              summary: 'مقاله با موفقیت حذف شد',
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
