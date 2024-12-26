import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'persianDate',
  standalone: true,
})
export class PersianDatePipe implements PipeTransform {
  transform(date: Date, hastime: string): any {
    const event = new Date(date);
    const optionsDate: any = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    const optionsTime: any = {
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
    };
    if (hastime === 'true') {
      return (
        event.toLocaleTimeString('fa', optionsTime ) +
        ' | ' +
        
        event.toLocaleDateString('fa', optionsDate)
      );
    } else {
      return event.toLocaleDateString('fa', optionsDate);
    }
  }
}


