const db = require('../data/db.js')


module.exports = {
    logged
}

function logged(id) {
    return db('users') 
    .where({id})
    .first()
    .then(user => {
        return db(`${user.type}s`)
        .where({user_id: user.id})
        .first()
        .then(rest => {
            for(let prop in rest) {
                if(prop !== 'id' && prop !== 'user_id'){
                    user[prop] = rest[prop]
                }
            }
            
            return user
        })
        
    })
}