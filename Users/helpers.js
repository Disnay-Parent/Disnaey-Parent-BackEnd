const db = require('../data/db.js')


module.exports = {
    logged,
    getAllParents,
    getAllVolunteers,
    getSingleParent,
    getSingleVolunteer,
    editUser
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
            if(user.type === 'parent') {
                return db('posts')
                .then(posts => {
                    return db('comments')
                    .then(comments => {
                        return db('children')
                        .where({user_id: id})
                        .then(children => {
                            user.children = []
                            children.map(eachChild => {
                                if(eachChild.user_id === user.id) {
                                    user.children.push(eachChild)
                                }
                            })

                            user.posts = []
                            posts.map(eachPost => {
                                eachPost.comments = []
                                comments.map(eachComment => {
                                    if(eachPost.id === eachComment.post_id) {
                                        eachPost.comments.push(eachComment)
                                    }
                                })
                                if(eachPost.user_id === user.id) {
                                    user.posts.push(eachPost)
                                }
                            })
                            for(let prop in rest) {
                                if(prop !== 'id' && prop !== 'user_id'){
                                    user[prop] = rest[prop]
                                }
                            }
                            return user
                        })
                        
                    })
                })
            } else {
                for(let prop in rest) {
                    if(prop !== 'id' && prop !== 'user_id'){
                        user[prop] = rest[prop]
                    }
                }
                return user
            }
        })
    })
}

// All parents
function getAllParents() {
    return db('users')
    .then(users => {
        return db('parents')
        .then(parents => {
            return db('posts') 
            .then(posts => {
                return db('comments')
                .then(comments => {
                    return db('children')
                    .then(children => {
                        posts.map(eachPost => {
                            eachPost.comments = []
                            comments.map(eachComment => {
                                if(eachPost.id === eachComment.post_id) {
                                    eachPost.comments.push(eachComment)
                                }
                            })
                        })

                        users.map(eachUser => {
                            eachUser.posts = []
                            eachUser.children = []
                            posts.map(eachPost => {
                                if(eachUser.id === eachPost.user_id){
                                    eachUser.posts.push(eachPost)
                                }
                            })

                            children.map(eachChild => {
                                if(eachUser.id === eachChild.user_id) {
                                    eachUser.children.push(eachChild)
                                }
                            })

                            parents.map(parent => {
                                if(eachUser.id === parent.user_id) {
                                    for(let key in parent) {
                                        if(key !== 'id' && key !== 'user_id'){
                                            eachUser[key] = parent[key]
                                        }
                                    }
                                }
                            })
                        })

                        return users
                    })
                    
                })
                
            })
            
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
                return db('posts')
                .then(posts => {
                    return db('comments')
                    .then(comments => {
                        return db('children')
                        .where({user_id: id})
                        .then(children => {
                            user.posts = []
                            posts.map(eachPost => {
                                eachPost.comments = []
                                comments.map(eachComment => {
                                    if(eachPost.id === eachComment.post_id){
                                        eachPost.comments.push(eachComment)
                                    }
                                })
    
                                if(eachPost.user_id === user.id) {
                                    user.posts.push(eachPost) 
                                }
                            })

                            user.children = []
                            children.map(eachChild => {
                                if(eachChild.user_id === user.id){
                                    user.children.push(eachChild)
                                }
                            })
    
                            for(let key in rest) {
                                if(key !== 'id' && key !== 'user_id'){
                                    user[key] = rest[key]
                                }
                            }
                            return user
                        })
                        
                    })
                })
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


// Edit User
function editUser(body, id) {
    return db('users')
    .where({id})
    .first()
    .then(userObj => {
        if(!userObj) {
            return `User with an ID of ${id} does not exist!`
        } else {
            return db('users')
            .where({id})
            .update({
                username: body.username,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                DOB: body.DOB
            })
            .then(() => {
                return db(`${body.type}s`)
                .where({user_id: id})
                .update(
                    body.type === 'parent' 
                    ? 
                    {
                        user_id: id,
                        emergencyPhone: body.emergencyPhone
                    } 
                    : 
                    {
                        user_id: id,
                        avgPerChild: body.avgPerChild,
                        priceNegotiable: body.priceNegotiable || false,
                        CPR_Certified: body.CPR_Certified || false
                    }
                )
                .then(() => {
                    return db('users')
                    .where({id})
                    .first()
                    .then(users => {
                        return db(`${body.type}s`)
                        .then(rest => {
                            if(body.type === 'parent') {
                                return db('posts')
                                .then(posts => {
                                    return db('comments')
                                    .then(comments => {
                                        return db('children')
                                        .where({user_id: users.id})
                                        .then(children => {
                                            users.posts = []
                                            posts.map(eachPost => {
                                                eachPost.comments = []
                                                comments.map(eachComment => {
                                                    if(eachComment.post_id === eachPost.id) {
                                                        eachPost.comments.push(eachComment)
                                                    }
                                                })

                                                if(eachPost.user_id === users.id){
                                                    users.posts.push(eachPost)
                                                }
                                            })

                                            users.children = []
                                            children.map(eachChild => {
                                                if(eachChild.user_id === users.id) {
                                                    users.children.push(eachChild)
                                                }
                                            })
    
                                            rest.map(eachRest => {
                                                if(users.id === eachRest.user_id) {
                                                    for(let key in eachRest) {
                                                        if(key !== 'id' && key !== 'user_id'){
                                                            eachRest.priceNegotiable == 0 ? eachRest.priceNegotiable = false : eachRest.priceNegotiable = true
                                                            eachRest.CPR_Certified == 0 ? eachRest.CPR_Certified = false : eachRest.CPR_Certified = true
                                                            users[key] = eachRest[key]
                                                        }
                                                    }
                                                }
                                            })
                                            
                                            return users
                                        })
                                        
                                    })
                                })
                            } else {
                                    rest.map(eachRest => {
                                        if(users.id === eachRest.user_id) {
                                            for(let key in eachRest) {
                                                if(key !== 'id' && key !== 'user_id'){
                                                    eachRest.priceNegotiable == 0 ? eachRest.priceNegotiable = false : eachRest.priceNegotiable = true
                                                    eachRest.CPR_Certified == 0 ? eachRest.CPR_Certified = false : eachRest.CPR_Certified = true
                                                    users[key] = eachRest[key]
                                                }
                                            }
                                        }
                                    })
                                return users
                            }  
                        })
                    })
                })
            })
        }
    })
}