const express = require('express');
const router = express.Router();
const {studentController} = require('../controllers/index') 


const verifyToken = require("../middlewares/verifyToken")
const checkRole = require('../middlewares/checkRole');

console.log(studentController);
router.get('/get-data', verifyToken, checkRole('student'), studentController.getStudentDataController)    

module.exports = router;