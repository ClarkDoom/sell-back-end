'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Listings', 'sold', {
      type: Sequelize.BOOLEAN
    });
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Listings', 'sold')
  }
};
