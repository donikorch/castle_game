'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
 

        await queryInterface.bulkInsert('Results', [
            {
                user_id: 1,
                level_id: 1,
                time: 10,
                score: 5,
                monsters: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },  
            {
                user_id: 1,
                level_id: 2,
                time: 20,
                score: 15,
                monsters: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },    
            {
                user_id: 1,
                level_id: 3,
                time: 5,
                score: 10,
                monsters: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },          
            {
                user_id: 1,
                level_id: 2,
                time: 15,
                score: 20,
                monsters: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },   
            {
                user_id: 1,
                level_id: 3,
                time: 10,
                score: 20,
                monsters: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },   
            {
                user_id: 1,
                level_id: 1,
                time: 15,
                score: 20,
                monsters: 12,
                createdAt: new Date(),
                updatedAt: new Date(),
            },   
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Results', null, {});
    },
};