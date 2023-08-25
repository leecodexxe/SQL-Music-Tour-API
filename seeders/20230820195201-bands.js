'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bands', [{
      name: 'Jimmy and John',
      genre: 'Counry west',
      founded: 1995,
      available_start_time: '18:00:00',
      end_time: '21:00:00',
    },
    {
      name: 'Jim Morrison',
      genre: 'West',
      founded: 2020,
      available_start_time: '12:00:00',
      end_time: '12:10:00',
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bands', null,{})
  }
};
