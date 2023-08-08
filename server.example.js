// connect http-module
const http = require('http')

const chalk = require('chalk')

const fs = require('fs/promises')
const path = require('path')
const {addNote} = require("./notes.controller");

// create port
const port = 3000

const basePath = path.join(__dirname, '/pages')

// create server
const server = http.createServer( async (req, res) => {
    if (req.method === 'GET') {
        // read index.ejs file
        const content = await fs.readFile(path.join(basePath, 'index.ejs'))
        // set manual headers by response
        // setHeaders('Content-Type','text/html')
        // send status code 200 to browser and set header
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(content)
    } else if (req.method === 'POST') {
        const body = []
        // send status code 200 to browser and set header
        res.writeHead(200, {'Content-Type': 'text/plain;  charset = utf-8'})
        // processing field input
        req.on('data', (data) => {
            body.push(Buffer.from(data))
        })
        console.log(body)
        req.on('end', () => {
            const title = body.toString().split('=')[1].replace(/\+/g, ' ')
            addNote(title)
            res.end(`title = ${title}`)
        })


    }
})

server.listen(port, ()=> {
    console.log(chalk.green(`Server has been started port: ${port}`))
})

