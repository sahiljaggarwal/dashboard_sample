const express = require("express");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const studentRoutes = require("./studentRoutes");
const hrRoutes = require("./hrRoutes");
const certificateRoutes = require("./certificateRoutes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
router.use("/hr", hrRoutes);
router.use("/certificate", certificateRoutes);

module.exports = router;
