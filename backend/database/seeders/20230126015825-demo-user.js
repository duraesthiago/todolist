'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      name: 'User Test',
      email: 'test@test.com',
      password: '$2b$10$I.B1wwuXpH/odofnuUj2.eeLawMAO3gRcp59CPCiTKaDZSMNTZzq6'
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
