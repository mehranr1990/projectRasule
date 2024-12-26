import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: string, type: 'persian' | 'class' = "persian") {
    if (type === 'persian') {
      switch (value) {
        case StatusPipes.PENDING:
          return 'در حال بررسی';
        case StatusPipes.CANCEL:
          return 'لغو شده';
        case StatusPipes.FAILED:
          return 'ناموفق';
        case StatusPipes.REJECT:
          return 'رد شده';
        case StatusPipes.CONFIRM:
          return 'تایید شده';
        case StatusPipes.UNKNOWN:
        default:
          return 'نامشخص';
      }
    } else {
      switch (value) {
        case StatusPipes.PENDING:
          return 'text-yellow-500';
        case StatusPipes.CANCEL:
        case StatusPipes.FAILED:
        case StatusPipes.REJECT:
          return 'text-rose-500';
        case StatusPipes.CONFIRM:
          return 'text-emerald-500';
        case StatusPipes.UNKNOWN:
        default:
          return 'text-gray-500';
      }
    }
  }
}

export enum StatusPipes {
  PENDING = 'pending',
  CANCEL = 'cancel',
  FAILED = 'failed',
  REJECT = 'reject',
  CONFIRM = 'confirm',
  UNKNOWN = 'unknown',
}
