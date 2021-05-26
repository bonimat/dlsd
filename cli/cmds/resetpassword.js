process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = require('../../models/index.js');
const User = db.User;
const bcrypt = require('bcrypt');
prompt = require('prompt');
prompt.colors = false;
exports.command = 'resetpassword';
exports.desc = 'Reset the password from email';
exports.builder = (yargs) => {
    return yargs
        .option('email', {
            alias: 'e',
            nargs: 1,
            demandOption: true,
        })
        .usage('Usage: $0 resetpassword [-e|--email] <username@mail.org>');
};
exports.handler = function (argv) {
    // console.log(argv);

    User.findOne({
        where: {
            email: argv.email,
        },
    })
        .then((user) => {
            //    console.log(user);
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
            console.log(prompt);
            prompt.start();
            prompt.message = '';
            prompt.get(schema, async function (err, result) {
                /*     console.log(
                    '  password: ' +
                        result.password +
                        '  password2: ' +
                        result.password2
                ); */
                if (result.password2 != result.password2) {
                    console.log('Passwords do not match.');
                } else if (result.password.length < 6) {
                    console.log('Password should be al least 6 characters.');
                }

                const hashadPassword = await bcrypt.hash(result.password, 10);
                user.password = hashadPassword;
                user.save();
                console.log('Success. Password has been changed');
            });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
};
