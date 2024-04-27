'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Themes', [
            {
                id: 1,
                layout: '/',
                castle: '/img/castles/castle_1.png',
                enemy: '/img/enemies/enemy_1.gif',
                background: '/img/backgrounds/background_1.jpeg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                layout: '/',
                castle: '/img/castles/castle_2.gif',
                enemy: '/img/enemies/enemy_2.gif',
                background: '/img/backgrounds/background_2.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                layout: '/',
                castle: '/img/castles/castle_3.png',
                enemy: '/img/enemies/enemy_3.gif',
                background: '/img/backgrounds/background_3.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Themes', null, {})
    },
}
