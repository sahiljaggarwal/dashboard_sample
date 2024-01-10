const mongoose = require("mongoose");
const Certificate = require("../../../models/Certificate");
const Course = require("../../../models/Course");
const Student = require("../../../models/Student");

async function createCertificate(req, res) {
  try {
    const { certificateId, courseName, name, startDate, endDate } = req.body;
    console.log("Course", courseName);
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(200).json({ message: "Student Id is required" });
    }
    if (!certificateId) {
      return res.status(200).json({ message: "Certificate Id is required" });
    }
    if (!courseName) {
      return res.status(200).json({ message: "Course Name is required" });
    }
    if (!startDate) {
      return res.status(200).json({ message: "start date Id is required" });
    }
    if (!endDate) {
      return res.status(200).json({ message: "end date Id is required" });
    }
    if (!name) {
      return res.status(200).json({ message: "name is required" });
    }
    const isCertificateExist = await Certificate.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
    });
    console.log("isCertificateExist", isCertificateExist);
    if (isCertificateExist) {
      console.log("Certificate already exist");
      return res.status(200).json({
        message: "Certificate already exist",
        success: true,
      });
    }
    const certificate = await new Certificate({
      studentId,
      certificateId,
      courseName,
      name,
      startDate,
      endDate,
    });
    await certificate.save();
    return res.status(200).json({
      message: "Certificate created successfully",
      certificate,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

module.exports = createCertificate;
