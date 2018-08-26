import {
  Dao
} from '../interfaces'
import orderBook, { orderBookOptions } from './order_book'
import currency, { currencyOptions } from './currency'
import assetsIndex, { assetsIndexOptions } from './assets_index'

import * as dbClient from '../sequelize'
export let models: Dao

export function registerModels (): Dao {
  models = dbClient.registerModels<Dao>({
    orderBook,
    currency,
    assetsIndex
  }, {
    orderBookOptions,
    currencyOptions,
    assetsIndexOptions
  })
  return models
}
