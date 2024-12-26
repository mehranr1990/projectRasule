import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkService } from 'src/app/core/services/dark.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private readonly _servDark:DarkService) { }

  ngOnInit() {
  }

}
