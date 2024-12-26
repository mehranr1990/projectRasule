export interface ITrade {
  tradeId: number,
  appId: number
  tradeBookId: number,
  type: TradeType,
  amount: number,
  rate: number,
  avg: number,
  customerName: string,
  customerId: number,
  creatorId: number,
  ratesSnapshot: string,
  transaction: string,
  createdAt: Date;
}

export enum TradeType {
  BUY = 'buy', // خرید
  SELL = 'sell', // فروش
  FUTURE_BUY = 'future-buy', // خرید آینده
  FUTURE_SELL = 'future-sell' // فروش آینده
}
