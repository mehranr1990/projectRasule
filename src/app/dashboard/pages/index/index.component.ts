import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchBoxComponent } from '../../../components/inputs/search-box/search-box.component';
import { FormCreatorComponent } from '../../../components/shared/form-creator/form-creator.component';
import {
  FormFieldType,
  FormModalField,
} from '../../../components/shared/form-creator/form-creator.model';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PrimengEditorComponent } from '../../../components/primeng-editor/primeng-editor.component';
import { PostsComponent } from '../posts/posts.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostsService } from 'src/app/core/services/posts.service';
import { Ipost } from 'src/app/core/models/post';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { CaslDirective } from 'src/app/core/directives/casl.directive';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CaslDirective,
    SearchBoxComponent,
    FormCreatorComponent,
    InputMaskModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    PrimengEditorComponent,
    PostsComponent,
    ButtonModule,
    ChipModule,
    CarouselModule,
    TagModule,
    NgApexchartsModule,
    CommonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>|any;
  responsiveOptions: any[];
  posts: any;
  constructor(private postsService: PostsService) {
    this.chartOptions = {
      series: [20, 10, 3],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["پست ها", "دسته ها", "نظرات"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  // constructor(private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit() {
    this.postsService.getAll(4, 1).subscribe({
      next: (resp) => {
        this.posts = resp;
        console.log(this.posts);
      },
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }

  visible: boolean = false;

  //   confirm(event: Event) {
  //     this.confirmationService.confirm({
  //         target: event.target as EventTarget,
  //         message: 'آیا از حذف این آیتم مطمئن هستید؟',
  //         header: 'اخطار',
  //         icon: 'fa-regular fa-circle-exclamation text-amber-500',
  //         acceptIcon:"none",
  //         rejectIcon:"none",
  //         acceptLabel:'تایید',
  //         acceptButtonStyleClass:"bg-sky-700 text-sky-100",
  //         rejectLabel:'رد',
  //         rejectButtonStyleClass:"text-slate-500 pe-5",
  //         accept: () => {
  //             this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
  //         },
  //         // reject: () => {
  //         //     this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  //         // }
  //     });
  // }
}
