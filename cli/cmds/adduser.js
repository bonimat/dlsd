const { demandOption } = require('yargs');

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
exports.handler = function (argv) {
    console.log(argv);
};
