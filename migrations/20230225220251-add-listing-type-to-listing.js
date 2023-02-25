'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Listings', 'type', {
      type: Sequelize.ENUM('Movie', 'Books', 'Music'),
    });
  },
  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Listings', 'type');
  }
};
