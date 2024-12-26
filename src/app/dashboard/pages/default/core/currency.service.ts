import {Injectable} from '@angular/core';
import {CrudService} from "../../../../core/services/crud.service";
import {ICustomer} from "./IDefault";
import {IDefaultCustomerDto} from "./IDefaultCustomerDto";
import {ApiService} from "../../../../core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends CrudService<ICustomer, IDefaultCustomerDto> {

  constructor(override readonly api: ApiService) {
    super(api, '/customer');
  }

}
