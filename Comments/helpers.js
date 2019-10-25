const db = require('../data/db.js')


module.exports = {
    addComment,
    allComments,
    singleComment,
    editComment,
    deleteComment
}

function allComments() {
    return db('comments')
}

function singleComment(id) {
    return db('comments')
    .where({id})
    .first()
}

function editComment(body, id) {
    return db('comments')
    .where({id})
    .first()
    .then(comment => {
        if(!comment) {
            return 'notFound'
        } else {
            return db('comments')
            .where({id})
            .update(body)
            .then(() => {
                return db('comments')
            })
        }
    })
}

function deleteComment(id, post_id) {
    return db('comments')
    .where({id})
    .first()
    .then(comment => {
        if(!comment) {
            return 'notFound'
        } else {
            return db('comments')
            .where({id})
            .first()
            .del()
            .then(() => {
                return db('comments')
                .where({post_id})
            })
        }
    })
}

function addComment(body) {
    console.log(body)
    return db('posts')
    .where({id: body.post_id})
    .first()
    .then(post => {
        if(!post) {
            return 'notFound'
        } else {
            return db('comments')
            .insert(body)
            .then(() => db('comments'))
        }
    })
}