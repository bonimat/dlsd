exports.command = 'resetpassword [email]';
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
    console.log(argv);
};
