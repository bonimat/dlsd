'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            firstname: {
                type: Sequelize.STRING,
            },
            lastname: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            resetPasswordToken: {
                type: Sequelize.STRING,
            },
            resetPasswordExpires: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    },
};
