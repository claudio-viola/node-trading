import * as SequelizeStatic from 'sequelize'

export const currency = {
  code: {
    type: SequelizeStatic.STRING(10),
    primaryKey: true
  },
  type: SequelizeStatic.ENUM('fiat', 'crypto', 'metal'),
  continent: {
    type: SequelizeStatic.STRING,
    allowNull: true
  },
  name: SequelizeStatic.STRING
}

export default currency

export const currencyOptions = {
  timestamps: false,
  paranoid: false
}
