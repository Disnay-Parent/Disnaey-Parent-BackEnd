const express = require('express')
const router = express.Router()

const helpers = require('./helpers.js')

const { restricted } = require('../Auth/middleware.js')


// All Comments
router.get('/comments', restricted, async (req, res) => {
    try {
        const comments = await helpers.allComments()
        res.status(200).json(comments)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})

// Single Comment
router.get('/comment/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide a correct ID!'})
    } else {
        try {
            const comment = await helpers.singleComment(req.params.id)

            !comment 
            ?
            res.status(404).json({message: 'Comment cannot be found!'})
            :
            res.status(200).json(comment)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server'})
        }
    }
})

// Edit Comment
router.put('/comment/:id', restricted, async (req, res) => {
    const { comment } = req.body
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID'})
    } else {
        if(!comment || comment.length === 0) {
            res.status(400).json({message: 'Please provide all the required fields'})
        } else {
            try {
                const edited = await helpers.editComment(req.body, req.params.id)

                edited === 'notFound'
                ?
                res.status(404).json({message: `Comment with an ID of ${req.params.id} does not exist!`})
                :
                res.status(200).json(edited)
            } catch(err) {
                res.status(500).json({message: 'Something went wrong with the server!'})
            }
        }
    }
})

// Create a Comment
router.post('/create', restricted, async (req, res) => {
    const { comment, post_id } = req.body
    if(!comment || comment.length === 0 || !post_id) {
        res.status(400).json({message: 'Please provide all the required fields!'})
    } else {
        try {
            const newCom = {
                username: req.decodedToken.username,
                firstName: req.decodedToken.firstName,
                lastName: req.decodedToken.lastName,
                comment: comment,
                post_id: post_id,
                user_id: req.decodedToken.id
            }
            const added = await helpers.addComment(newCom)

            added === 'notFound' 
            ?
            res.status(404).json({message: 'Post does not exist anymore!'})
            :
            res.status(200).json(added)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
    }
})

// Delete comment
router.delete('/:postId/delete/:id', restricted, async (req, res) => {
    if(!req.params.id) {
        res.status(400).json({message: 'Please provide an ID!'})
    } else {
        try {
            const deleted = await helpers.deleteComment(req.params.id, req.params.postId)

            deleted === 'notFound'
            ?
            res.status(404).json({message: `Comment with an ID of ${req.params.id} does not exist!`})
            :
            res.status(200).json(deleted)
        } catch(err) {
            res.status(500).json({message: 'Something went wrong with the server!'})
        }
        
    }
})





module.exports = router