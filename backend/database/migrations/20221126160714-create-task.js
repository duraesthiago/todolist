'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      idtask: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_text: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      task_done: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};