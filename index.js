
// connect express framework
const express = require('express')
const path = require('path')
const basePath = path.join(__dirname, 'public')

const app = express()
const chalk = require('chalk')
// setup express to ejs
app.set('view engine', 'ejs')
// setup directory views to pages
app.set('views', 'pages')

// connect clients JavaScript file
app.use(express.static(path.join(basePath)))

// add setup for send data to server format json
app.use(express.json())

const {addNote, getNotes, removeNote, updateNote} = require("./notes.controller");

// create port
const port = 3000

// using middleware for parsing data from body require
app.use(express.urlencoded({extended: true}))


app.get('/', async (req, res)=> {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false})
})

app.post('/', async (req, res)=> {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true})
})

// get fetch -> from app.js (client side)
app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true})
})

app.put('/:id', async (req, res) => {
    await updateNote(req.params.id, req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false})
})

app.listen(port, ()=> {
    console.log(chalk.green(`Server has been started port: ${port}`))
})

