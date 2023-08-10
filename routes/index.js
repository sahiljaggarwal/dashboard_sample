const express = require('express');
const authRoutes = require("./authRoutes")
const adminRoutes = require("./adminRoutes")
const studentRoutes = require("./studentRoutes")
const hrRoutes = require('./hrRoutes')
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes)
router.use('/student', studentRoutes)
router.use('/hr', hrRoutes)

module.exports = router;