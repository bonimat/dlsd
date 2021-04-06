/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // eslint-disable-next-line require-jsdoc
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            username: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            resetPasswordToken: DataTypes.STRING,
            resetPasswordExpires: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );
    return User;
};
