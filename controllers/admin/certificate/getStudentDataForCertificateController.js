// const Certificate = require("../../../models/Certificate");
// const Student = require("../../../models/Student");

// async function getStudentDataForCertificate(req, res) {
//   try {
//     const studentId = req.params.studentId;
//     const student = await Student.findOne({ _id: studentId });
//     if (!student || student.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Student not found", success: true });
//     }
//     console.log("student: ", student);
//     let coursetype;
//     switch (student.course[0]) {
//       case "backend":
//         coursetype = "BED";
//         break;
//       case "frontend":
//         coursetype = "FED";
//         break;
//       case "ui/ux":
//         coursetype = "UIUX";
//         break;
//       case "mobile":
//         coursetype = "MOB";
//         break;
//       case "fullstack":
//         coursetype = "FSD";
//         break;
//       // Add more cases as needed for other courses
//       default:
//         coursetype = ""; // Handle default case if needed
//     }
//     // const certificate = await Certificate.find({
//     //   certificateId: { $regex: new RegExp(`^${coursetype}`) },
//     // });
//     // if (!certificate || certificate.length === 0) {
//     //   return res
//     //     .status(404)
//     //     .json({ message: "Certificate not found", success: true });
//     // }

//     const dobFormatted = formatDateOfBirth(student.dob);

//     // Generate the certificate ID using course type and student's date of birth
//     const certificateId = generateCertificateId(coursetype, dobFormatted);
//     console.log("Certificate Id: ", certificateId);
//     console.log("course type: ", coursetype);

//     const certificate = await Certificate.find({ certificateId });

//     if (!certificate || certificate.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Certificate not found", success: true });
//     }

//     return res
//       .status(200)
//       .json({ message: "student data", student, success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// }

// function formatDateOfBirth(dob) {
//   const date = new Date(dob);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
//   const year = date.getFullYear().toString();
//   return `${day}${month}${year}`;
// }

// function generateCertificateId(coursetype, dobFormatted) {
//   // You can modify the format of the certificate ID as needed
//   // For example, BED-03052002-001
//   return `${coursetype}-${dobFormatted}-001`;
// }

// module.exports = getStudentDataForCertificate;

// Modified Code !
// const Certificate = require("../../../models/Certificate");
// const Student = require("../../../models/Student");

// async function getStudentDataForCertificate(req, res) {
//   try {
//     const studentId = req.params.studentId;
//     const student = await Student.findOne({ _id: studentId });
//     if (!student || student.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Student not found", success: true });
//     }

//     let coursetype;
//     switch (student.course[0]) {
//       case "backend":
//         coursetype = "BED";
//         break;
//       case "frontend":
//         coursetype = "FED";
//         break;
//       case "ui/ux":
//         coursetype = "UIUX";
//         break;
//       case "mobile":
//         coursetype = "MOB";
//         break;
//       case "fullstack":
//         coursetype = "FSD";
//         break;
//       default:
//         coursetype = "";
//     }

//     const dobFormatted = formatDateOfBirth(student.dob);

//     // Get the latest certificate for the course type
//     const latestCertificate = await Certificate.findOne({
//       certificateId: { $regex: new RegExp(`^${coursetype}`) },
//     }).sort({ issuedDate: -1 });

//     // Generate the certificate ID using course type, student's date of birth, and the latest certificate ID
//     const certificateId = generateCertificateId(
//       coursetype,
//       dobFormatted,
//       latestCertificate ? latestCertificate.certificateId : undefined
//     );
//     console.log("Certificate Id: ", certificateId);
//     console.log("course type: ", coursetype);

//     // const certificate = await Certificate.find({ certificateId });
//     // console.log("certificate: ", certificate);
//     // if (!certificate || certificate.length === 0) {
//     //   return res
//     //     .status(404)
//     //     .json({ message: "Certificate not found", success: true });
//     // }
//     const studentData = {
//       name: `${student.firstName} ${student.lastName}`,
//       certificateId: certificateId,
//       course: student.course,
//     };
//     return res
//       .status(200)
//       .json({ message: "student data", studentData, success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// }

// function formatDateOfBirth(dob) {
//   const date = new Date(dob);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear().toString();
//   return `${day}${month}${year}`;
// }

// function generateCertificateId(coursetype, dobFormatted, currentCertificateId) {
//   const currentIdNumeric = currentCertificateId
//     ? parseInt(currentCertificateId.split("-")[2], 10)
//     : 0;
//   const nextIdNumeric = currentIdNumeric + 1;
//   const paddedNextIdNumeric = nextIdNumeric.toString().padStart(3, "0");
//   return `${coursetype}-${dobFormatted}-${paddedNextIdNumeric}`;
// }

// module.exports = getStudentDataForCertificate;

// const Certificate = require("../../../models/Certificate");
// const Student = require("../../../models/Student");

// async function getStudentDataForCertificate(req, res) {
//   try {
//     const studentId = req.params.studentId;
//     const student = await Student.findOne({ _id: studentId });
//     if (!student || student.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Student not found", success: true });
//     }

//     let coursetype;
//     switch (student.course[0]) {
//       case "backend":
//         coursetype = "BE";
//         break;
//       case "frontend":
//         coursetype = "FE";
//         break;
//       case "ui/ux":
//         coursetype = "UIUX";
//         break;
//       case "mobile":
//         coursetype = "MA";
//         break;
//       case "fullstack":
//         coursetype = "FS";
//         break;
//       default:
//         coursetype = "";
//     }

//     const dobFormatted = formatDateOfBirth(student.dob);

//     // Get the latest certificate for any course type
//     const latestCertificate = await Certificate.findOne({
//       //   certificateId: { $regex: new RegExp(`^OC-${dobFormatted}-`) },
//     }).sort({ issuedDate: -1 });

//     // Generate the certificate ID using date of birth, course type, and the latest certificate ID
//     const certificateId = generateCertificateId(
//       dobFormatted,
//       coursetype,
//       latestCertificate ? latestCertificate.certificateId : undefined
//     );
//     console.log("latest certificate: ", latestCertificate);
//     console.log("Certificate Id: ", certificateId);
//     console.log("course type: ", coursetype);

//     const studentData = {
//       name: `${student.firstName} ${student.lastName}`,
//       certificateId: certificateId,
//       course: student.course,
//     };
//     return res
//       .status(200)
//       .json({ message: "student data", studentData, success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// }

// function formatDateOfBirth(dob) {
//   const date = new Date(dob);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear().toString();
//   return `${year}${month}${day}`;
// }

// function generateCertificateId(dobFormatted, coursetype, currentCertificateId) {
//   const currentIdNumeric = currentCertificateId
//     ? parseInt(currentCertificateId.split("-")[3], 10)
//     : 0;
//   const nextIdNumeric = currentIdNumeric + 1;
//   const paddedNextIdNumeric = nextIdNumeric.toString().padStart(3, "0");
//   return `OC-${dobFormatted}-${coursetype}${paddedNextIdNumeric}`;
// }

// module.exports = getStudentDataForCertificate;

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
    console.log("latest certificate: ", latestCertificate);
    console.log("Certificate Id: ", certificateId);
    console.log("course type: ", coursetype);

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
  //   const currentIdNumeric = currentCertificateId
  //     ? parseInt(currentCertificateId.split("-")[2], 10)
  //     : 0;
  const number = currentCertificateId.split("-").pop();
  console.log("number is", number);
  const singleId = number;
  const match = singleId.match(/\d+/); // Match one or more digits
  const extractedNumber = match ? match[0] : null; // Extract the matched digits or return null
  console.log("extracted number is", extractedNumber);
  const currentIdNumeric = parseInt(extractedNumber);
  //   const currentIdNumeric = currentCertificateId
  //     ? parseInt(currentCertificateId.split("-").pop(), 10) || 0
  //     : 0;
  const nextIdNumeric = currentIdNumeric + 1;
  const paddedNextIdNumeric = nextIdNumeric.toString().padStart(3, "0");
  console.log("paddedNextIdNumeric: ", paddedNextIdNumeric);
  console.log("currentIdNumeric: ", currentIdNumeric);
  console.log("nextIdNumeric: ", nextIdNumeric);
  return `OC-${dobFormatted}-${coursetype}${paddedNextIdNumeric}`;
}

module.exports = getStudentDataForCertificate;
