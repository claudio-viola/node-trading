'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets_index', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      index_id: Sequelize.STRING(36),
      index_value: Sequelize.DECIMAL(30,16),
      currency_code: Sequelize.STRING(10),
      currency_price:  Sequelize.DECIMAL(30,16),
      currency_weigth: Sequelize.DECIMAL(19,16),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at:  {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('assets_index');
  }
};
