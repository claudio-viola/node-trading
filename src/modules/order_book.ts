import { models } from '../db/models'
import * as services from '../services'
import {
  IndexDataResponse,
  Asset
} from '../services/interfaces'
import * as uuid from 'uuid'
import {
  Currency,
  OrderBook,
  OrderBookAction
} from '../db/interfaces'
const Json2csvParser = require('json2csv').Parser

interface ICurrenciesObj {
  [key: string]: Currency
}
interface IAssetsObj {
  [key: string]: Asset
}

export async function export2csv (orderBook: OrderBook[]) {
  const fields = ['currency_name', 'trading_pair', 'weight', 'amount', 'action']
  const json2csvParser = new Json2csvParser({ fields })
  const csv = json2csvParser.parse(orderBook)
  console.log('Order book report')
  console.log(csv)
}
export async function createOrderBook (fundAmount: number, fundCurrencyCode: string): Promise<OrderBook[]> {
  try {
    const [ currencies , indexData ] = await Promise.all<Currency[],IndexDataResponse>([
      getCurrencies(),
      services.getIndex()])
    const currenciesObj: ICurrenciesObj = getCurrenciesObj(currencies)
    const assetData: IAssetsObj = indexData.data[0].assets
    const orderBookItems = createOrderBookItems({
      fundAmount,
      fundCurrencyCode,
      currenciesObj,
      assetData
    })
    await models.orderBook.bulkCreate(orderBookItems)
    return orderBookItems
  } catch (err) {
    console.log('Error', err)
    throw err
  }
}

async function getCurrencies (): Promise<Currency[]> {
  try {
    const currencies = await models.currency.findAll()
    return currencies.map(currency => { return currency.get() })
  } catch (err) {
    throw err
  }
}

function getCurrenciesObj (currencies: Currency[]): ICurrenciesObj {
  return currencies.reduce(
    (acc: ICurrenciesObj, currentValue, currentIndex): ICurrenciesObj => {
      acc[currentValue.code] = {
        ...currentValue
      }
      return acc
    }, { })
}

function createOrderBookItems (args: {
  currenciesObj: ICurrenciesObj,
  assetData: IAssetsObj,
  fundAmount: number,
  fundCurrencyCode: string
}): OrderBook[] {
  try {
    const orders: OrderBook[] = Object.keys(args.assetData).map((currency, index) => {
      return {
        id: uuid.v4(),
        currency_name: args.currenciesObj[currency].name,
        weight: args.assetData[currency].weight,
        trading_pair: `${args.fundCurrencyCode}/${currency}`,
        action: args.assetData[currency].weight > 0 ? OrderBookAction.Buy : OrderBookAction.Sell,
        amount: args.fundAmount * args.assetData[currency].weight
      }
    })
    return orders
  } catch (err) {
    console.log(err)
    throw err
  }
}
