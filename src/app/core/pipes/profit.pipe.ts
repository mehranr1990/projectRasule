import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profit',
  standalone: true,

})
export class ProfitPipe implements PipeTransform {

  transform(value: any, type: 'number' | 'class' | 'icon'): any {

    switch (type) {
      case 'number':

        if (value.includes('-')) {
          return this.removeFirstCharacter(value)
        } else {
          return value
        }


      case 'class':
        if (value > 0) {
          return 'flex items-center justify-center gap-2 text-emerald-600';
        } else if (value == 0) {
          return 'flex items-center justify-center gap-2 text-zinc-600';
        } else {
          return 'flex items-center justify-center gap-2 text-rose-600';
        }

      case 'icon':
        if (value > 0) {
          return 'fa-duotone fa-solid fa-caret-up text-xl';
        } else if (value == 0) {
          return '';
        } else {
          return 'fa-duotone fa-solid fa-caret-down text-xl';
        }

      default:
        return value
    }

  }

  removeFirstCharacter(str: string) {
    return str.substring(1);
  }

}
