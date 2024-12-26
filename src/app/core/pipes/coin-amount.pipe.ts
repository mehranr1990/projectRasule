import {CurrencyPipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'coinAmount',
  standalone: true
})
export class CoinAmountPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {
  }

  transform(value: any, numberOfDigits: number) {
    return this.currencyPipe.transform(value, 'IRR', ' ', '1.2-' + numberOfDigits)
  }

}
