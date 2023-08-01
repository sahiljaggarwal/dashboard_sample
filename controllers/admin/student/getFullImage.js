const path = require('path');
const Student = require('../../../models/Student');

// Controller to serve the full image for the user's profile photo
async function getFullImage(req, res) {
  try {
    const userId = req.params.studentId;
    const user = await Student.findOne({ user: userId });

    if (!user || !user.profilePhoto) {
      return res.status(404).json({ message: 'User or profile photo not found' });
    }

    // Resolve the correct file path for the profile photo
    const profilePhotoPath = path.resolve(__dirname, `../../../uploads/profilePhotos/${user.profilePhoto}`);

    // Set the response headers
    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Disposition', 'inline');

    const response = {
      success: true,
      data: profilePhotoPath
    }
    // Send the full image in the response
    // return res.sendFile(profilePhotoPath);
    return res.sendFile(response);
  } catch (error) {
    console.error('Error serving full image:', error);
    return res.status(500).json({ message: 'Error serving full image', success: false });
  }
}

module.exports =  getFullImage ;
