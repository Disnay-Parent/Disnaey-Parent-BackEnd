const db = require('../data/db.js')

module.exports = {
    addChild,
    userChildren,
    editChild
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

function editChild(id) {
    return db('children')
    .where({id})
    .first()
    .then(child => {
        if(!child){
            return 'notFound'
        }
    })
}