const Certificate = require("../../../models/Certificate");

async function deleteCertificate(req, res) {
  try {
    const certificateId = req.params;
    const deleteCertificate = await Certificate.findByIdAndRemove(
      certificateId
    );
    if (!deleteCertificate || deleteCertificate.length === 0) {
      return res.status(404).json({
        message: "Certificate not found",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Certificate Deleted successfully",

      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
}

module.exports = deleteCertificate;
