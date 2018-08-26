import * as SequelizeStatic from 'sequelize'

export namespace Database {
  export interface Config extends SequelizeStatic.Options {}
  export interface Client extends SequelizeStatic.Sequelize {}
  export interface Model<TInstance, TAttributes> extends SequelizeStatic.Model<TInstance, TAttributes> {}
  export interface Instance<TAttributes> extends SequelizeStatic.Instance<TAttributes> {}
  export interface DefineAttributes extends SequelizeStatic.DefineAttributes {}
  export interface DefineOptions<TInstance> extends SequelizeStatic.DefineOptions<TInstance> {}
}
export enum OrderBookAction {
  Buy = 'BUY',
  Sell = 'SELL'
}

export interface OrderBook {
  id: string,
  currency_name: string,
  trading_pair: string,
  weight: number,
  amount: number,
  action: OrderBookAction,
  created_at?: string,
  updated_at?: string
}

export type OrderBookInstance = Database.Instance<OrderBook>
export type OrderBookModel = Database.Model<OrderBookInstance , OrderBook>

export enum CurrencyType {
  Fiat = 'fiat',
  Crypto = 'crypto',
  Metal = 'metal'
}
export interface Currency {
  code: string,
  continent?: string,
  name: string,
  type: CurrencyType,
}
export type CurrencyInstance = Database.Instance<Currency>
export type CurrencyModel = Database.Model<CurrencyInstance , Currency>

export interface AssetsIndex {
  id: string
  index_id: string,
  index_value: number,
  currency_code: string,
  currency_price: number,
  currency_weigth: number,
  created_at?: string,
  updated_at?: string
}
export type AssetsIndexInstance = Database.Instance<AssetsIndex>
export type AssetsIndexModel = Database.Model<AssetsIndexInstance , AssetsIndex>

export interface Dao {
  orderBook: OrderBookModel,
  currency: CurrencyModel,
  assetsIndex: AssetsIndexModel
}
