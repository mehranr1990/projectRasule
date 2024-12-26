import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input('meta') meta: Imeta;
  @Input('rowsPerPage') rowsPerPage: number[] = [10, 25, 50]
  @Output('pageChange') pageChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onPageChange(event) {
    const pyload = {
      page: event.page + 1,
      limit: event.rows,
      search: '',
    };
    this.pageChange.emit(pyload);
  }

}

export interface Imeta {
  currentPage: number,
  itemCount: string,
  itemsPerPage: string,
  totalItems: number,
  totalPages: number
}
