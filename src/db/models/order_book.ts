import * as SequelizeStatic from 'sequelize'

export const orderBook = {
  id: {
    type: SequelizeStatic.STRING(36),
    primaryKey: true
  },
  currency_name: SequelizeStatic.STRING(),
  trading_pair: SequelizeStatic.STRING,
  weight: SequelizeStatic.DECIMAL(19,16),
  amount: SequelizeStatic.DECIMAL(30,16),
  action: SequelizeStatic.ENUM('BUY', 'SELL')
}

export default orderBook

export const orderBookOptions = {
  timestamps: true,
  paranoid: false
}
