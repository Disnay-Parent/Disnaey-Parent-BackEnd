const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')


//Getting Logged In User
router.get('/logged', restricted, async (req, res) => {

    console.log(req.decodedToken.id)

    try {
        const loggedIn = await helpers.logged(req.decodedToken.id)
        res.status(200).json(loggedIn)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})




module.exports = router