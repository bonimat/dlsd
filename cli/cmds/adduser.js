process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = require('../../models/index.js');
const Role = db.Role;
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

exports.command = 'adduser';
exports.desc = 'Add new user';
exports.builder = (yargs) => {
    return yargs
        .option('username', { alias: 'u', nargs: 1, demandOption: true })
        .option('firstname', { alias: 'n', nargs: 1, demandOption: true })
        .option('lastname', { alias: 'l', nargs: 1, demandOption: true })
        .option('email', { alias: 'e', nargs: 1, demandOption: true })
        .usage(
            'Usage: $0 adduser -u supermario -n mario -l rossi -e m.rossi@mail.it'
        );
};
exports.handler = exports.handler = async function (argv) {
    if (argv.username.length < 6) {
        console.log('Username should be al least 8 characters.');
    } else {
        const schema = {
            properties: {
                password: {
                    description: 'Password', // Prompt displayed to the user. If not supplied name will be used.
                    type: 'string', // Specify the type of input to expect.
                    pattern: /^\w+$/, // Regular expression that input must be valid against.
                    message: 'Password must be letters', // Warning message to display if validation fails.
                    hidden: true, // If true, characters entered will either not be output to console or will be outputed using the `replace` string.
                    replace: '*', // If `hidden` is set it will replace each hidden character with the specified string.
                    required: true, // If true, value entered must be non-empty.
                    // Runs before node-prompt callbacks. It modifies user's input
                },
                password2: {
                    description: 'Rewrite password', // Prompt displayed to the user. If not supplied name will be used.
                    type: 'string', // Specify the type of input to expect.
                    pattern: /^\w+$/, // Regular expression that input must be valid against.
                    message: 'Password must be letters', // Warning message to display if validation fails.
                    hidden: true, // If true, characters entered will either not be output to console or will be outputed using the `replace` string.
                    replace: '*', // If `hidden` is set it will replace each hidden character with the specified string.
                    required: true, // If true, value entered must be non-empty.
                    // Runs before node-prompt callbacks. It modifies user's input
                },
            },
        };
        prompt.start();
        prompt.message = '';
        prompt.get(schema, async function (err, result) {
            console.log(
                '  password: ' +
                    result.password +
                    '  password2: ' +
                    result.password2
            );
            if (err) {
                console.log(err);
            } else {
                if (result.password2 != result.password2) {
                    console.log('Passwords do not match.');
                } else if (result.password.length < 6) {
                    console.log('Password should be al least 6 characters.');
                }

                const role = await Role.findOne({
                    where: { rolename: 'user' },
                });
                const hashadPassword = await bcrypt.hash(result.password, 10);

                const [user, created] = await User.findOrCreate({
                    attributes: ['email', 'username'],
                    where: {
                        [Op.or]: [
                            { username: argv.username },
                            { email: argv.email },
                        ],
                    },
                    defaults: {
                        username: argv.username,
                        email: argv.email,
                        firstname: argv.firstname,
                        lastname: argv.lastname,
                        password: hashadPassword,
                        roleid: role.id,
                    },
                });
                if (created) {
                    console.log('User is now registered.');
                } else {
                    if (user) {
                        console.log(
                            'User exists. Try changing username or email'
                        );
                    } else {
                        console.log('Some problem with findUser');
                    }
                }
            }
        });
    }
};
