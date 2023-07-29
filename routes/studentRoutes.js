const express = require('express');
const router = express.Router();
const {studentController} = require('../controllers/index') 


const verifyToken = require("../middlewares/verifyToken")
const checkRole = require('../middlewares/checkRole');

// console.log(studentController);
router.get('/get-data', verifyToken, checkRole('student'), studentController.getStudentDataController)    
router.get('/get-image', verifyToken, checkRole('student'), studentController.getFullImage)    
router.get('/get-thumbnail', verifyToken, checkRole('student'), studentController.getRoundThumbnail)    

module.exports = router;

