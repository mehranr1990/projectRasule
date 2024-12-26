import {Injectable} from '@angular/core';
import {CrudService} from "../../../../core/services/crud.service";
import {ICustomer} from './IDefault';
import {IDefaultCustomerDto} from './IDefaultCustomerDto';
import {ApiService} from "../../../../core/services/api.service";
import {ITrade, TradeType} from "./ITrade";
import {ITradeDto} from "./ITradeDto";

@Injectable({
  providedIn: 'root'
})
export class DefaultService extends CrudService<ICustomer, IDefaultCustomerDto> {

  constructor(override readonly api: ApiService) {
    super(api, '/customer');

  }

  override getAllMap = {
    'id': 'id',
    'mobile': 'mobile',
    'fullname': 'fullname',
    'description': 'description',
    'createDate': 'createdAt',
    'appId': 'appId'
  }


  // override getAllMap = {
  //   'customerAppId': 'appId',
  //   'customerFullName': 'customerName',
  //   'customerId': 'customerId',
  //   'tradeId': 'tradeId',
  //   'tradeTradeBookId': 'tradeBookId',
  //   'tradeCreatorId': 'creatorId',
  //   'tradeType': 'type',
  //   'tradeAmount': 'amount',
  //   'tradeRate': 'rate',
  //   'tradeAvg': 'avg',
  //   'tradeRatesSnapshot': 'ratesSnapshot',
  //   'tradeTransaction': 'transaction',
  //   'tradeCreateDate': 'createdAt'
  // }

  override getAllEnums = {
    'type': {
      0: TradeType.BUY,
      1: TradeType.SELL,
      2: TradeType.FUTURE_BUY,
      3: TradeType.FUTURE_SELL,
    }
  }

  override createAndUpdateEnums = {
    'description': {
      'buy': 0,
      'sell': 1,
      'future-buy': 2,
      'future-sell': 3,
    }
  }


}
