#!/usr/bin/env node
const yargs = require('yargs');
yargs.commandDir('cmds').demandCommand().help().alias('help', 'h').argv;
