const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')

const auth = require('../Auth/routes.js')
const users = require('../Users/routes.js')
const posts = require('../Posts/routes.js')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', auth)
server.use('/api/users', users)
server.use('/api/posts', posts)


server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to Disney Parent Back-End</h1>`
    )
})

module.exports = server