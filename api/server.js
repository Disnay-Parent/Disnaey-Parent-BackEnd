const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')

const auth = require('../Auth/routes.js')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', auth)


server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to Disney Parent Back-End</h1>`
    )
})

module.exports = server