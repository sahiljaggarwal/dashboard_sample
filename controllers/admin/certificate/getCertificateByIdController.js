const Certificate = require("../../../models/Certificate");

async function getCertificateById(req, res) {
  try {
    // const certificateId = req.params.certificateId;
    const { certificateId, name } = req.body;
    // const getCertificates = await Certificate.findOne({ _id: certificateId });
    const getCertificates = await Certificate.findOne({
      certificateId: certificateId,
    });
    if (!getCertificates || getCertificates.length === 0) {
      return res.status(404).json({
        message: "Certificate not found",

        success: true,
      });
    }
    return res.status(200).json({
      message: "Certificates",
      getCertificates,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

module.exports = getCertificateById;
