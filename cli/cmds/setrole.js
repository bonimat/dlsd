process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = require('../../models/index.js');
const sequelize = db.sequelize;
const User = db.User;
const Role = db.Role;

exports.command = 'setrole';
exports.description = 'Set the role of user';
exports.builder = (yargs) => {
    return yargs
        .option('email', { alias: 'e', nargs: 1, demandOption: true })
        .option('role', {
            alias: 'r',
            nargs: 1,
            demandOption: true,
            choices: ['user', 'admin'],
        })
        .usage(
            'Usage: $0 setrole [-e|--email] <username@mail.org> -r [admin|user]'
        );
};
exports.handler = function (argv) {
    console.log('email: ' + argv.email + ' role: ' + argv.role);
    Role.findOne({
        where: { rolename: argv.role },
    }).then((role) => {
        User.findOne({
            where: { email: argv.email },
        }).then((user) => {
            user.setDataValue('roleid', role.id);
            user.save();
            console.log('New role update');
        });
    });
};
