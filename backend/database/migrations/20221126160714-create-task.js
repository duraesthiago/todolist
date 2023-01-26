'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      idtasks: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_text: {
        type: Sequelize.STRING
      },
      task_done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};