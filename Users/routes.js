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



// =============== PARENTS =================


//All Parents
router.get('/parents', restricted, async (req, res) => {

    try {
        const parents = await helpers.getAllParents()

        res.status(200).json(parents)
    } catch(err) {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})

//Single Parent By ID

router.get('/parent/:id', restricted, async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    try {
        const parent = await helpers.getSingleParent(id)

        !parent.id ? res.status(404).json({message: parent}) : res.status(200).json(parent)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})

// ___________________________________________________________________________


// ==================== Volunteers =====================


//All Volunteers
router.get('/volunteers', restricted, async (req, res) => {

    try {
        const volunteers = await helpers.getAllVolunteers()

        res.status(200).json(volunteers)
    } catch {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})

//Single Volunteer By ID

router.get('/volunteer/:id', restricted, async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    try {
        const volunteer = await helpers.getSingleVolunteer(id)

        !volunteer.id ? res.status(404).json({message: volunteer}) : res.status(200).json(volunteer)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})




module.exports = router