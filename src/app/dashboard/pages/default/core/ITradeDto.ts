import {TradeType} from "./ITrade";
import {FormFieldSelectData} from "../../../../components/shared/form-creator/form-creator.model";

export interface ITradeDto {
  tradeBookId: number,
  type: TradeTypeDto,
  amount: number,
  rate: number,
  avg: number,
  customerId: number,
  transaction: string
}

export enum TradeTypeDto {
  BUY = 0,
  SELL = 1,
  FUTURE_BUY = 2,
  FUTURE_SELL = 3,
}

export const TradTypeList: FormFieldSelectData[] = [
  {label: 'خرید', value: TradeType.BUY, icon: ''},
  {label: 'فروش', value: TradeType.SELL, icon: ''},
  {label: 'خرید آینده', value: TradeType.FUTURE_BUY, icon: ''},
  {label: 'فروش آینده', value: TradeType.FUTURE_SELL, icon: ''},
]

export const itemSelectButton: FormFieldSelectData[] = [
  {label: 'خرید', value: TradeType.BUY, icon: ''},
  {label: 'فروش', value: TradeType.SELL, icon: ''},
  {label: 'خرید آینده', value: TradeType.FUTURE_BUY, icon: ''},
  {label: 'فروش آینده', value: TradeType.FUTURE_SELL, icon: ''},
]
