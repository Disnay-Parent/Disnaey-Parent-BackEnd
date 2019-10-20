const db = require('../data/db.js')


module.exports = {
    logged,
    getAllParents,
    getAllVolunteers,
    getSingleParent,
    getSingleVolunteer
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

// All parents
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

// All Volunteers
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
                                volunteer.priceNegotiable == 0 ? volunteer.priceNegotiable = false : volunteer.priceNegotiable = true
                                volunteer.CPR_Certified == 0 ? volunteer.CPR_Certified = false : volunteer.CPR_Certified = true
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

// Single Parent
function getSingleParent(id) {
    return db('users')
    .where({id})
    .first()
    .then(user => {
        return db('parents')
        .where({user_id: id})
        .first()
        .then(rest => {
            if(!rest) {
                return `Parent with an ID of ${id} could not be found.`
            } else {
                for(let key in rest) {
                    if(key !== 'id' && key !== 'user_id'){
                        user[key] = rest[key]
                    }
                }
                return user
            }
        })
    })
}

// Single Volunteer
function getSingleVolunteer(id) {
    return db('users')
    .where({id})
    .first()
    .then(user => {
        return db('volunteers')
        .where({user_id: id})
        .first()
        .then(rest => {
            if(!rest) {
                return `Volunteer with an ID of ${id} could not be found.`
            } else {
                for(let key in rest) {
                    if(key !== 'id' && key !== 'user_id'){
                        rest.priceNegotiable == 0 ? rest.priceNegotiable = false : rest.priceNegotiable = true
                        rest.CPR_Certified == 0 ? rest.CPR_Certified = false : rest.CPR_Certified = true
                        user[key] = rest[key]
                    }
                }
                return user
            }
        })
    })
}