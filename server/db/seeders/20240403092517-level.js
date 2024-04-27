'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Levels', [
      {
        difficult: 'easy',
        word_length: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        difficult: 'medium',
        word_length: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        difficult: 'hard',
        word_length: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Levels', null, {});
  },
};
