const Certificate = require("../../../models/Certificate");

async function getCertificates(req, res) {
  try {
    const certificates = await Certificate.find();
    if (!certificates || certificates.length === 0) {
      return res
        .status(404)
        .json({ message: "Certificates Not Found", success: true });
    }
    return res
      .status(200)
      .json({ message: "Certificates", certificates, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

module.exports = getCertificates;
