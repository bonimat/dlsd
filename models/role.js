/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        // eslint-disable-next-line valid-jsdoc
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.User);
        }
    }
    Role.init(
        {
            rolename: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Role',
        }
    );
    return Role;
};
