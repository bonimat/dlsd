exports.command = 'setrole';
exports.description = 'Set the role of user';
exports.builder = (yargs) => {
    return yargs
        .option('email', { alias: 'e', nargs: 1, demandOption: true })
        .option('role', { alias: 'r', nargs: 1, demandOption: true })
        .usage(
            'Usage: $0 setrole [-e|--email] <username@mail.org> -r [admin|user]'
        );
};
exports.handler = function (argv) {
    console.log(argv);
};
