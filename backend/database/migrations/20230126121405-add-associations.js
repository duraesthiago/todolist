'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'tasks',
      'users_idusers',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'idusers',
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'tasks',
      'users_idusers'
    );
  }
};
