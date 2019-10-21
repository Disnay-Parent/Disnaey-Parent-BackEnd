const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')




// Fetch ALL post
router.get('/posts', restricted, async (req, res) => {
    
    try {
        const posts = await helpers.allPosts()

        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})

// Fetch Single Post
router.get('/post/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID'})
    } else {
        try {
            const post = await helpers.singlePost(req.params.id)

            res.status(200).json(post)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server'})
        }
    }
})

// Fetch Logged In User Posts
router.get('/posts/logged', restricted, async (req, res) => {
    try {
        const logged = await helpers.loggedPosts(req.decodedToken.id)
        res.status(200).json(logged)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})

// Edit a Post
router.put('/edit/:id', restricted, async (req, res) => {
    const { post, location, time } = req.body
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID'})
    } else if(!post || !location || !time || post.length === 0 || location.length === 0 || time.length === 0){
        res.status(400).json({ message: 'Please provide all the required fields! '})
    } else {
        try {
            const edited = await helpers.editPost(req.body, req.params.id)

            edited === 'notFound' 
            ? 
            res.status(404).json({message: `Post with an ID of ${req.params.id} does not exist!`})
            :
            res.status(200).json(edited)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

// Create a Post
router.post('/create', restricted, async (req, res) => {
    // console.log(req.decodedToken)
    const { post, location, time } =  req.body
    if(post.length === 0 || location.length === 0 || time.length === 0) {
        res.status(400).json({ message: 'Please provide all the required fields! '})
    } else {
        try {
            const newObj = {
                username: req.decodedToken.username,
                firstName: req.decodedToken.firstName,
                lastName: req.decodedToken.lastName,
                post: post,
                location: location,
                time: time,
                user_id: req.decodedToken.id
            }
            const create = await helpers.createPost(newObj)
            res.status(200).json(create)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
        
    }
})

// Delete a Post
router.delete('/delete/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID'})
    } else {
        try {
            const deleted = await helpers.deletePost(req.params.id)
            deleted === 'notFound'
            ?
            res.status(404).json({message: `Post with an ID of ${req.params.id} does not exist!`})
            :
            res.status(200).json(deleted)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})



module.exports = router