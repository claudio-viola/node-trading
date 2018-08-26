require('dotenv').config()

import { init as dbInit } from './db/sequelize'
import * as models from './db/models'
import { createOrderBook, export2csv } from './modules/order_book'

// TODO make available from commandline / env
const INITIAL_FUND_AMOUNT = 20000000
const INITIAL_FUND_CURRENCY_CODE = 'EUR';

(async () => {
  try {
    await dbInit()
    await models.registerModels()
    const orders = await createOrderBook(INITIAL_FUND_AMOUNT,INITIAL_FUND_CURRENCY_CODE)
    export2csv(orders)
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
