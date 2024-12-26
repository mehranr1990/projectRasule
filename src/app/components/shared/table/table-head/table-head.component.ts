import { Component } from '@angular/core';
import {SearchBoxComponent} from "../../../inputs/search-box/search-box.component";

@Component({
  selector: 'app-table-head',
  standalone: true,
  imports: [
    SearchBoxComponent
  ],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss'
})
export class TableHeadComponent {

}
