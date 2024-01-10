const Certificate = require("../../../models/Certificate");
const Student = require("../../../models/Student");

async function getStudentDataForCertificate(req, res) {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findOne({ _id: studentId });
    if (!student || student.length === 0) {
      return res
        .status(404)
        .json({ message: "Student not found", success: true });
    }

    let coursetype;
    switch (student.course[0]) {
      case "backend":
        coursetype = "BE";
        break;
      case "frontend":
        coursetype = "FE";
        break;
      case "ui/ux":
        coursetype = "UIUX";
        break;
      case "mobile":
        coursetype = "MA";
        break;
      case "fullstack":
        coursetype = "FS";
        break;
      default:
        coursetype = "";
    }

    const dobFormatted = formatDateOfBirth(student.dob);

    // Get the latest certificate for any course type
    const latestCertificate = await Certificate.findOne({}).sort({
      issuedDate: -1,
    });

    // Generate the certificate ID using date of birth, course type, and the latest certificate ID
    const certificateId = generateCertificateId(
      dobFormatted,
      coursetype,
      latestCertificate ? latestCertificate.certificateId : undefined
    );

    const studentData = {
      name: `${student.firstName} ${student.lastName}`,
      certificateId: certificateId,
      course: student.course,
    };
    return res
      .status(200)
      .json({ message: "student data", studentData, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

function formatDateOfBirth(dob) {
  const date = new Date(dob);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${year}${month}${day}`;
}

function generateCertificateId(dobFormatted, coursetype, currentCertificateId) {
  const number = currentCertificateId
    ? currentCertificateId.split("-").pop()
    : "";
  const singleId = number;
  const match = singleId.match(/\d+/);
  const extractedNumber = match ? match[0] : null;
  const currentIdNumeric = extractedNumber ? parseInt(extractedNumber) : 0;
  const nextIdNumeric = currentIdNumeric + 1;
  const paddedNextIdNumeric = nextIdNumeric.toString().padStart(3, "0");
  return `OC-${dobFormatted}-${coursetype}${paddedNextIdNumeric}`;
}

module.exports = getStudentDataForCertificate;
