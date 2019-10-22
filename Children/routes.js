const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')


// Add Child
router.post('/create', restricted, async (req, res) => {
    const { name, DOB } = req.body
    req.body.user_id = req.decodedToken.id

    console.log(req.body)

    if(!name || !DOB || name.length === 0 || DOB.length === 0) {
        res.status(400).json({message: 'Please provide all the required fields!'})
    } else {
        // helpers.addChild(req.body, req.decodedToken.id)

        //     res.status(201).json(added)
        try {
            const added = await helpers.addChild(req.body, req.decodedToken.id)

            res.status(201).json(added)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

module.exports = router