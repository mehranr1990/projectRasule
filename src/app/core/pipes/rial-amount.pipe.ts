import {CurrencyPipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rialAmount',
  standalone: true
})
export class RialAmountPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {
  }

  transform(value: any) {
    return this.currencyPipe.transform(value, 'IRR', ' ', '1.0-0')

  }

}
