const  generateRoundThumbnail  = require ('../../services/thumbnailService.js');
const Student = require ('../../models/Student');
const path = require('path');

// Controller to serve the round thumbnail image for the user's profile photo
async function getRoundThumbnail(req, res) {
  try {
    // Fetch the user data from the database using the ID from the JWT token
    // const userId = req.user.id;
    const userId = req.user.id;
    const user = await Student.findOne({user: userId});

    if (!user || !user.profilePhoto) {
      return res.status(404).json({ message: 'User or profile photo not found' });
    }

    // Resolve the correct file path for the profile photo
    const profilePhotoPath = path.resolve(__dirname, `../../uploads/profilePhotos/${user.profilePhoto}`);

    // Generate the round thumbnail image
    const roundedBuffer = await generateRoundThumbnail(profilePhotoPath);

    // Set the response headers
    res.set('Content-Type', 'image/jpeg');
    res.set('Content-Disposition', 'inline');

    // Send the round thumbnail image in the response
    res.send(roundedBuffer);
  } catch (error) {
    console.error('Error generating round thumbnail:', error);
    res.status(500).json({ message: 'Error generating round thumbnail' });
  }
}

module.exports =  getRoundThumbnail ;
