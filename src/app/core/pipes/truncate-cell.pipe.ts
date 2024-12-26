import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncateCell',
  standalone: true,
})
export class TruncateCellPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    try {
      if (limit != null && value != null) {
        return value.length < limit || value.length == limit ? value : value.slice(0, limit) + ' ...';
      } else {
        return value
      }
    } catch (error) {
      return value
    }
  }
}
