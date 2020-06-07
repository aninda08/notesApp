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

const getNotes = () => {
    const notes = loadNotes();
    return notes;
}

const addNotes = (title1, body) => {
    const notes = loadNotes();
    if(!notes.find( note => note.title === title1 )) {
        notes.push({
            title:title1,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added!'));
    } else {
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const removeNotes = (title1) => {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title ===title1 );
    if(index !== -1) {
        notes.splice(index,1);
        saveNotes(notes);
        console.log(chalk.green.inverse(`Note removed!`));
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
    
}

module.exports = { getNotes, addNotes, removeNotes };