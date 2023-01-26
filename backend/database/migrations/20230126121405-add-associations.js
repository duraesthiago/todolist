'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Tasks',
      'users_idusers',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'idusers',
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Tasks',
      'users_idusers'
    );
  }
};
