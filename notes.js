const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try {
        const notes = fs.readFileSync('./notes.json').toString();
        return JSON.parse(notes);
    } catch(e) {
        return [];
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./notes.json', dataJSON);
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( note => note.title === title )
    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("NO NOTES FOUND"));
    }
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    if(!notes.find( note => note.title === title )) {
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('NOTE ADDED!'));
    } else {
        console.log(chalk.red.inverse("NOTE TITLE TAKEN"));
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title === title );
    if(index !== -1) {
        notes.splice(index,1);
        saveNotes(notes);
        console.log(chalk.green.inverse(`NOTE REMOVED!`));
    } else {
        console.log(chalk.red.inverse('NO NOTE FOUND!'));
    }
    
}

const listNotes = () => {
    const notes = loadNotes();

    if(notes.length > 0) {
        console.log(chalk.inverse("MY NOTES"));
    
        notes.forEach(note => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.red.inverse('NO NOTES FOUND'));
    }
    
}

module.exports = { readNote, addNotes, removeNotes, listNotes };