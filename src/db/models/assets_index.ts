import * as SequelizeStatic from 'sequelize'

export const assetsIndex = {
  id: {
    type: SequelizeStatic.STRING(36),
    primaryKey: true
  },
  index_id: SequelizeStatic.STRING(36),
  index_value: SequelizeStatic.DECIMAL(30,16),
  currency_code: SequelizeStatic.STRING(5),
  currency_price:  SequelizeStatic.DECIMAL(30,16),
  currency_weigth:  SequelizeStatic.DECIMAL(19,16)
}

export default assetsIndex

export const assetsIndexOptions = {
  timestamps: true,
  paranoid: false
}
