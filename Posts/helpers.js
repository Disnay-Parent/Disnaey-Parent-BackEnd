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
    .then(() => allPosts())
}

function allPosts() {
    return db('posts')
    .then(posts => {
        return db('comments')
        .then(comments => {
            posts.map(eachPost => {
                eachPost.comments = []
                comments.map(eachComment => {
                    if(eachPost.id === eachComment.post_id) {
                        eachPost.comments.push(eachComment)
                    }
                })
            })
            return posts
        })
    })
}

function singlePost(id) {
    return db('posts')
    .where({id})
    .first()
    .then(post => {
        return db('comments')
        .then(comments => {
            post.comments = []
            comments.map(eachComment => {
                if(post.id === eachComment.post_id) {
                    post.comments.push(eachComment)
                }
            })
            return post
        })
    })
}

function loggedPosts(user_id) {
    return db('posts')
    .where({user_id})
    .first()
    .then(post => {
        return db('comments')
        .then(comments => {
            post.comments = []
            comments.map(eachComment => {
                if(post.id === eachComment.post_id) {
                    post.comments.push(eachComment)
                }
            })
            return post
        })
    })
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
            .then(() => singlePost(id))
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
            .then(() => allPosts())
        }
    })
}