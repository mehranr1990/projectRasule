import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'type',
  standalone: true
})
export class TypePipe implements PipeTransform {

  transform(value: any, type: 'persian' | 'class' = "persian") {
    if (type === 'persian') {
      switch (value) {
        case TypePipes.WITHDRAW:
          return 'برداشت';
        case TypePipes.DEPOSIT:
          return 'واریز';
        case TypePipes.TRANSFER:
          return 'انتقال';
        case TypePipes.UNKNOWN:
        default:
          return "نامشخص";
      }
    } else {
      switch (value) {
        case TypePipes.WITHDRAW:
          return 'text-blue-500';
        case TypePipes.DEPOSIT:
          return 'text-emerald-500';
        case TypePipes.TRANSFER:
          return 'text-yellow-500';
        case TypePipes.UNKNOWN:
        default:
          return "text-gray-500";
      }
    }
  }
}

export enum TypePipes {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
  UNKNOWN = 'unknown',
}
