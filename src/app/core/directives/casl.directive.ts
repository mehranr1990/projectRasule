import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { UserStore } from '../stores/user.store';

@Directive({
  selector: '[appCasl]',
  standalone: true,
})
export class CaslDirective implements OnInit {
  @Input({ required: true }) appCasl: string;
  @HostBinding('class')
  elementClass = '';
  constructor(
    private readonly user: UserStore,
    private elementRef: ElementRef
  ) {}
  ngOnInit() {
    console.log(this.appCasl);
    console.log(this.user.info.role);
    if (this.user.info.role?.includes(this.appCasl)) {
    } else {
      this.elementRef.nativeElement.remove()
    }
  }
}
