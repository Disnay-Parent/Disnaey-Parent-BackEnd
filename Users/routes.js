const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')


//Getting Logged In User
router.get('/logged', restricted, async (req, res) => {

    try {
        const loggedIn = await helpers.logged(req.decodedToken.id)
        res.status(200).json(loggedIn)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})


//All Parents
router.get('/parents', restricted, async (req, res) => {

    try {
        const parents = await helpers.getAllParents()

        res.status(200).json(parents)
    } catch {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})


//All Volunteers
router.get('/volunteers', restricted, async (req, res) => {

    try {
        const volunteers = await helpers.getAllVolunteers()

        res.status(200).json(volunteers)
    } catch {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})




module.exports = router