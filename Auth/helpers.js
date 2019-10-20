const db = require('../data/db.js')

module.exports = {
    register,
    login,
    userTest,
    volunteerTest,
    parentTest
}

function register(body) {
    return db('users')
    .insert({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        DOB: body.DOB,
        phoneNum: body.phoneNum,
        type: body.type
    })
    .then(() => {
        if(body.type.toLowerCase() === 'parent') {
            return db('users')
            .where({ username: body.username })
            .first()
            .then(user => {
                return db('parents')
                .insert({
                    emergencyPhone: body.emergencyPhone,
                    user_id: user.id
                })
                .then(id => id[0])
            })
        } else {
            return db('users')
            .where({ username: body.username })
            .first()
            .then(user => {
                return db('volunteers')
                .insert({
                    avgPerChild: body.avgPerChild || 0,
                    priceNegotiable: body.priceNegotiable || false,
                    CPR_Certified: body.CPR_Certified || false,
                    user_id: user.id
                })
            })
        }
    })
    
}

function login(username) {
    return db('users')
    .where({username})
    .first()
}



function volunteerTest() {
    return db('volunteers')
}

function parentTest() {
    return db('parents')
}

function userTest() {
    return db('users')
}