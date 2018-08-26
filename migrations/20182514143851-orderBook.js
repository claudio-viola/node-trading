'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_book', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      currency_name: {
        type: Sequelize.STRING(),
        primaryKey: true
      },
      trading_pair: Sequelize.STRING(),
      weight: Sequelize.DECIMAL(19,16),
      amount: Sequelize.DECIMAL(30,16),
      action: Sequelize.ENUM("BUY", "SELL"),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at:  {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_book');
  }
};
