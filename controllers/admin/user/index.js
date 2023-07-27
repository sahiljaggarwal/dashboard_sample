const createUserController = require('./createUser');
const deleteUserById = require('./deleteUserById');
const getAllUserProfiles = require('./getAllUserProfiles');
const updateUser = require('./updateUser')
const getUserById = require('./getUserById')



module.exports = {
    createUserController, 
    deleteUserById,
    getAllUserProfiles,
    updateUser,
    getUserById
}