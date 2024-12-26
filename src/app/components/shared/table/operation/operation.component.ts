import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [CommonModule, ButtonModule, OverlayPanelModule, TooltipModule,],
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  @Input('typeOpe') typeOpe: 'dropdown' | 'button' = 'dropdown'

  constructor() { }

  ngOnInit() {
    // console.log(screen.width);
    // if(screen.width < 768){
    //   this.typeOpe = 'button'
    // }
  }


}
