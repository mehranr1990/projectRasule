import {Directive, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[selectAllInputFocusIn]',
  standalone: true,
})
export class SelectAllInputFocusInDirective implements OnInit {
  // @Input({alias: 'appFormErrorHandler', required: true}) appFormErrorHandler:any;
  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  onFocus(e) {
    (e.target as HTMLInputElement).select();
  }
}
