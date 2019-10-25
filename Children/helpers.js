const db = require('../data/db.js')

module.exports = {
    addChild,
    userChildren,
    editChild,
    deleteChild
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

function editChild(id, body) {
    return db('children')
    .where({id})
    .first()
    .then(child => {
        if(!child){
            return 'notFound'
        } else {
            return db('children')
            .where({id})
            .update(body)
            .then(() => {
                return db('children')
                .where({id})
                .first()
            })
        }
    })
}

function deleteChild(id, user_id) {
    return db('children')
    .where({id})
    .first()
    .then(child => {
        if(!child){
            return 'notFound'
        } else {
            return db('children')
            .where({id})
            .first()
            .del()
            .then(() => {
                return db('children')
                .where({user_id})
            })
        }
    })
}