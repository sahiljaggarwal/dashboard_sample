const multer = require('multer');
const path = require('path');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for profile photos
    cb(null, 'uploads/profilePhotos');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded profile photo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `profilePhoto-${uniqueSuffix}${extension}`);
  },
});

// Define the file filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create the multer middleware
const uploadProfilePhoto = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB (adjust the limit as per your requirement)
  },
  fileFilter: fileFilter,
}).single('profilePhoto'); // 'profilePhoto' should match the field name in the form where the file is uploaded

module.exports = uploadProfilePhoto;
