const db = require('../data/db.js')

module.exports = {
    addChild,
    userChildren
}

function addChild(body, id) {
    return db('children')
    .insert(body)
    .then(() => {
        return db('children')
        .where({user_id: id})
    })
}

function userChildren(id) {
    return db('users')
    .where({id})
    .first()
    .then(user => {
        if(!user) {
            return 'notFound'
        } else {
            return db('children')
            .where({user_id: user.id})
        }
    })
}