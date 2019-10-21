const db = require('../data/db.js')


module.exports = {
    createPost,
    allPosts,
    singlePost,
    loggedPosts,
    editPost,
    deletePost
}

function createPost(body) {
    return db('posts')
    .insert(body)
    .then(() => db('posts'))
}

function allPosts() {
    return db('posts')
}

function singlePost(id) {
    return db('posts')
    .where({id})
    .first()
}

function loggedPosts(user_id) {
    return db('posts')
    .where({user_id})
}

function editPost(body, id) {
    return db('posts')
    .where({id})
    .then(post => {
        if(!post) {
            return 'notFound'
        } else {
            return db('posts')
            .where({id})
            .update(body)
            .then(() => {
                return db('posts')
            })
        }
    })
}

function deletePost(id) {
    return db('posts')
    .where({id})
    .first()
    .then(post => {
        if(!post) {
            return 'notFound'
        } else {
            return db('posts')
            .where({id})
            .first()
            .del()
            .then(() => db('posts'))
        }
    })
}