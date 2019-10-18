const jsonWT = require('jsonwebtoken')
const secrets = require('../config/secret.js')

module.exports = {
    generateToken, 
    restricted
}

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type
    }

    const options = {
        expiresIn: '1d'
    }

    return jsonWT.sign(payload, secrets.jwtSecret, options)
}

function restricted(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jsonWT.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'There was a problem with your token'})
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'You need a token before accessing this route' })
    }
}