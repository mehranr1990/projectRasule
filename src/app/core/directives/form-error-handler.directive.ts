import {Directive, DoCheck, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[appFormErrorHandler]',
  standalone: true,
})
export class FormErrorHandlerDirective {
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @Input({alias: 'appFormErrorHandler', required: true}) appFormErrorHandler: FormGroup;

  @HostListener('focusout', ['$event'])
  onFocus(e) {
    let domElement = this.elementRef.nativeElement.querySelectorAll('.errorhandler input, .errorhandler textarea, textarea.errorhandler, input.errorhandler, .errorhandler .p-dropdown span')
    // let domElement1 = this.elementRef.nativeElement.querySelectorAll('input');

    for (const element of domElement) {
      this.renderer.addClass(element.parentNode, 'parent-input-group');
      const small = this.renderer.createElement('small');
      this.renderer.addClass(small, 'form-input-error');
      if (element.id) {
        this.renderer.addClass(small, element.id);
      }
      // console.log(element);
      let text: any = this.renderer.createText('');
      const spanDomElement = this.elementRef.nativeElement.getElementsByClassName(element.id);
      for (let index = 0; index < spanDomElement.length; index++) {
        this.renderer.removeChild(element.parent, spanDomElement[index]);
      }

      if (!this.appFormErrorHandler.get(element.id)?.valid && this.appFormErrorHandler.get(element.id)?.touched) {
        if (this.appFormErrorHandler.get(element.id)?.hasError('minlength')) {
          text = this.renderer.createText(`حداقل ${this.appFormErrorHandler.get(element.id)?.errors?.['minlength'].requiredLength} کاراکتر`);
        } else if (this.appFormErrorHandler.get(element.id)?.hasError('maxlength')) {
          text = this.renderer.createText(`حداکثر ${this.appFormErrorHandler.get(element.id)?.errors?.['maxlength'].requiredLength} کاراکتر`);
        } else if (this.appFormErrorHandler.get(element.id)?.hasError('required')) {
          text = this.renderer.createText('این فیلد باید پر شود ');
        }
      }
      this.renderer.appendChild(small, text);
      this.renderer.insertBefore(
        element.parentNode,
        small,
        this.renderer.nextSibling(element)
      );
    }

  }

}
