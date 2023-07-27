const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUserById = require('./deleteUserById')
const getAllUserProfiles = require('./getAllUserProfiles')
const getUserById = require('./getUserById')

module.exports = {
    updateUser,
    deleteUserById,
    getAllUserProfiles,
    createUser,
    getUserById
}