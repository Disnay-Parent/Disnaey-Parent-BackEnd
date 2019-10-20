const db = require('../data/db.js')


module.exports = {
    logged,
    getAllParents,
    getAllVolunteers
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

function getAllParents() {
    return db('users')
    .then(users => {
        return db('parents')
        .then(parents => {
            const array = []
            users.map(each => {
                parents.map(parent => {
                    if(each.id === parent.user_id) {
                        for(let key in parent) {
                            if(key !== 'id' && key !== 'user_id'){
                                each[key] = parent[key]
                            }
                        }
                        array.push(each)
                    }
                })
            })
            return array
        })
    })
}

function getAllVolunteers() {
    return db('users')
    .then(users => {
        return db('volunteers')
        .then(volunteers => {
            const array = []
            users.map(each => {
                volunteers.map(volunteer => {
                    if(each.id === volunteer.user_id) {
                        for(let key in volunteer) {
                            if(key !== 'id' && key !== 'user_id'){
                                each[key] = volunteer[key]
                            }
                        }
                        array.push(each)
                    }
                })
            })
            return array
        })
    })
}