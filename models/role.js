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
            this.hasMany(models.User, { foreignKey: 'roleid' });
        }
        static setup() {
            return Promise.all([
                this.findOrCreate({ where: { rolename: 'admin' } }),
                this.findOrCreate({ where: { rolename: 'user' } }),
            ]);
        }
    }
    Role.init(
        {
            rolename: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'roles',
        }
    );

    return Role;
};
