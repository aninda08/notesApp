const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.0.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});
//Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
});
//Create list command
yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler() {
        notes.listNotes();
    }
});
//Create read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();

