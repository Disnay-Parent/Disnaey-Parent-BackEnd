const db = require('../data/db.js')

module.exports = {
    addChild
}

function addChild(body, id) {
    return db('children')
    .insert(body)
    .then(() => {
        return db('children')
        .where({user_id: id})
    })
}