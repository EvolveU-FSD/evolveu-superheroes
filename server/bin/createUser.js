const mongoose = require('../models/dbAccess')
const User = require('../models/User')

if (process.argv.length < 4) {
    throw new Error('Usage: createUser <username> <password>')
}

const username = process.argv[2]
const password = process.argv[3]

User
    .create({username, password})
    .then((createdUser) => {
        console.log('created user:', createdUser)
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((error) => {
        console.log('Error creating user: ', error)
    })
