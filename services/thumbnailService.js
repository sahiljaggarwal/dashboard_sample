const sharp = require('sharp');
const path = require('path');

// Function to generate a round thumbnail image from the profile photo
async function generateRoundThumbnail(profilePhoto) {
  try {
    // Define the desired dimensions for the thumbnail
    const thumbnailSize = 200;

    // Use Sharp library to resize the image
    const resizedBuffer = await sharp(profilePhoto)
      .resize(thumbnailSize, thumbnailSize)
      .toBuffer();

    // Create a circular mask for the thumbnail
    const maskBuffer = Buffer.from(
      `<svg>
        <circle cx="${thumbnailSize / 2}" cy="${thumbnailSize / 2}" r="${thumbnailSize / 2}" fill="white" />
      </svg>`
    );

    // Apply the circular mask to the resized image
    const roundedBuffer = await sharp(resizedBuffer)
      .composite([{ input: maskBuffer, blend: 'dest-in' }])
      .toBuffer();

    return roundedBuffer;
  } catch (error) {
    throw error;
  }
}

module.exports =  generateRoundThumbnail ;