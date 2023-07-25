const express = require('express');
const authRoutes = require("./authRoutes")
const adminRoutes = require("./adminRoutes")
const studentRoutes = require("./studentRoutes")
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes)
router.use('/student', studentRoutes)

module.exports = router;