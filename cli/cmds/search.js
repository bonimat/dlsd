process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = require('../../models/index.js');
const sequelize = db.sequelize;
const User = db.User;
const Role = db.Role;

exports.command = 'search';
exports.description = "Search user's profile from email";
exports.builder = (yargs) => {
    return yargs
        .option('email', {
            alias: 'e',
            nargs: 1,
            demandOption: true,
        })
        .usage('Usage: $0 search [-e|--email] <username@mail.org>');
};

exports.handler = function (argv) {
    User.findOne({
        where: { email: argv.email },
        include: Role,
    })
        .then((user) => {
            console.log('username: ' + user.username);
            console.log('firstname: ' + user.firstname);
            console.log('lastname: ' + user.lastname);
            return user.getRole();
        })
        .then((user) => console.log('role: ' + user.rolename));
};
