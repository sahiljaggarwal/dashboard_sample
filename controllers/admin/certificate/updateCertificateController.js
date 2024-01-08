const Certificate = require("../../../models/Certificate");

async function updateCertificate(req, res) {
  try {
    const updates = req.body;
    const certificateId = req.params.certificateId;
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      { _id: certificateId },
      updates,
      { new: true }
    );
    if (!updatedCertificate || updatedCertificate.length === 0) {
      return res.status(404).json({
        message: "Certificate not found",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Certificate updated successfully",
      updatedCertificate,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

module.exports = updateCertificate;
