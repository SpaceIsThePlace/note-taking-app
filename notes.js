const fs = require('fs');
const chalk = require ('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();    
    const duplicateNote = notes.find( note => note.title === title );

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    } else {
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    let noteFound = false;  
    const notesToKeep = notes.filter((note) => {
        if (note.title !== title) {
            return true;
        } else {
            noteFound = true;
            console.log(chalk.green.inverse(`Note \'${note.title}\' found and removed`));
            return false;
        }                
    })
    if (!noteFound) {
        console.log(chalk.red.inverse("Title not found"));
    }
    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Your notes:"))
    notes.forEach( (note) => {
        console.log(chalk.blue(`- ${note.title}`));        
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find( note => note.title === title );
    if (foundNote) {
        console.log(chalk`{blue.inverse ${foundNote.title}} - {blue ${foundNote.body}} `);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return[];
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};