const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const checkRole = require("../middlewares/checkRole");
const { adminController } = require("../controllers/index");

router.get(
  "/list",
  verifyToken,
  checkRole("admin"),
  adminController.getCertificates
);

router.post(
  "/create/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.createCertificate
);

router.put(
  "/:certificateId",
  verifyToken,
  checkRole("admin"),
  adminController.updateCertificate
);
router.delete(
  "/:certificateId",
  verifyToken,
  checkRole("admin"),
  adminController.deleteCertificate
);
router.post(
  "/verify/certificate",
  // verifyToken,
  // checkRole("admin"),
  adminController.getCertificateById
);

router.get(
  "/student/:studentId",
  verifyToken,
  checkRole("admin"),
  adminController.getStudentDataForCertificate
);

module.exports = router;
