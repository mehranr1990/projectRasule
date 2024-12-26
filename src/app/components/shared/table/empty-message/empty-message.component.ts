import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { TableModule } from 'primeng/table';

@Component({
  selector: '.app-empty-message',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss']
})
export class EmptyMessageComponent implements OnInit {

  @Input('loading') loading: boolean = true

  constructor() { }

  ngOnInit() {
  }

}
