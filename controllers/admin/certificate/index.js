const getCertificates = require("./getListOfCertificatesController");
const createCertificate = require("./createCertificateController");
const updateCertificate = require("./updateCertificateController");
const deleteCertificate = require("./deleteCertificateController");
const getCertificateById = require("./getCertificateByIdController");
const getStudentDataForCertificate = require("./getStudentDataForCertificateController");

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getCertificateById,
  getStudentDataForCertificate,
};
