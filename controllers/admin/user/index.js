const createUser = require('./createUserController');
const deleteUserById = require('./deleteUserByIdController');
const getAllUserProfiles = require('./getAllUserProfilesController');
const updateUser = require('./updateUserController')
const getUserById = require('./getUserByIdController')



module.exports = {
    createUser, 
    deleteUserById,
    getAllUserProfiles,
    updateUser,
    getUserById
}