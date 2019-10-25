const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')


// User Children
router.get('/user/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID for the User'})
    } else {
        try {
            const children = await helpers.userChildren(req.params.id)

            children === 'notFound'
            ?
            res.status(404).json({message: `User with an ID of ${req.params.id} does not exist!`})
            :
            res.status(200).json(children)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

// Add Child
router.post('/create', restricted, async (req, res) => {
    const { name, DOB } = req.body
    req.body.user_id = req.decodedToken.id

    if(!name || !DOB || name.length === 0 || DOB.length === 0) {
        res.status(400).json({message: 'Please provide all the required fields!'})
    } else {
        try {
            const added = await helpers.addChild(req.body, req.decodedToken.id)

            res.status(201).json(added)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

router.put('/edit/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID!'})
    } else {
        try {
            const edited = await helpers.editChild(req.params.id)

            edited === 'notFound'
            ?
            res.status(404).json({message: `Child with an ID of ${req.params.id} does not exist!`})
            :
            res.status(200).json(edited)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

module.exports = router