
// create var fs (file system) version with promises and get access to module fs for work to file system computer
const fs = require('fs/promises')

// use module path
const path = require('path')

// create var notesPath
const notesPath = path.join(__dirname, 'db.json')

// use module chalk for decoration console
const chalk = require('chalk')

async function addNote(title) {
    // get data from db.json
    const notes = await getNotes()

    // create new note
    const note = {
        title: title,
        id: Date.now().toString()
    }

    notes.push(note)
    // wait and recording data to file db.json
    await saveNotes(notes)
    console.log(chalk.bgGreen('Add note!'))
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes(){
    // read notes from db.json
    const notes = await fs.readFile(notesPath, 'utf-8')
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes): []
}

async function printNotes() {
    const notes = await getNotes()
    console.log('Print all notes:')
    notes.forEach((note) => {
        console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    const filtered = notes.filter((note) => note.id != id)
    await saveNotes(filtered)
    console.log(chalk.red(`Note with id="${id}" has been removed`))
}

async function updateNote(id, newNoteTitle) {
    const notes = await getNotes()
    const updatedNotes = notes.map(note => {
        if (note.id === id) {
            return {...note, title: newNoteTitle}
        }
        return note
    })
    await saveNotes(updatedNotes)
    console.log(chalk.red(`Note with id="${id}" has been updated`))
}

// export functions
module.exports = {
    addNote, removeNote, getNotes, updateNote
}