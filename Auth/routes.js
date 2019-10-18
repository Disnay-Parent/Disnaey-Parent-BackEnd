const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const helpers = require('./helpers.js')

const { generateToken } = require('./middleware.js')


router.post('/register', async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash

    console.log(user)

    if(!user.type) {
        res.status(400).json({ message: 'Please provide an user type '})
    } else {
        if(user.type.toLowerCase() === 'parent') {
            if(user.username.length === 0 || user.password.length === 0 || user.firstName.length === 0 ||user.lastName.length === 0 ||user.email.length === 0 || !user.age || user.emergencyPhone.length === 0) {
                res.status(400).json({ message: 'Please provide all the required fields' })
            } else {
                try {
                    const registered = await helpers.register(user)

                    res.status(201).json(registered)
                } catch (err) {
                    res.status(500).json({message: 'Something went wrong when registering user'})
                }
            }
        } else {
            if(user.username.length === 0 || user.password.length === 0 || user.firstName.length === 0 ||user.lastName.length === 0 ||user.email.length === 0 || !user.age || !user.avgPerChild) {
                res.status(400).json({ message: 'Please provide all the required fields' })
            } else {
                try {
                    const registered = await helpers.register(user)

                    res.status(201).json({message: 'Successfully Registered'})
                } catch (err) {
                    res.status(500).json({message: 'Something went wrong when registering user'})
                }
            }
        }
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    helpers
    .login(username)
    .then(user => {
        if(!user) {
            res.status(404).json({ message: 'Can\'t find an user with the specified username'})
        } else {
            if(bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(201).json({message: `Logged In! Your ID is ${user.id}`, token})
            } else {
                res.status(400).json({message: 'Wrong Password'})
            }
        }
    })
})


router.get('/user/test', (req, res) => {
    helpers.userTest()
    .then(response => res.json(response))
})

router.get('/parent/test',  (req, res) => {
    helpers.parentTest()
    .then(response => res.json(response))
})

router.get('/volunteer/test',  (req, res) => {
    helpers.volunteerTest()
    .then(response => res.json(response))
})



module.exports = router