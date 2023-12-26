// multerMiddleware.js
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    const fieldName = req.body.fieldName;
    let uploadPath;

    if (file.fieldname === "course") {
      // uploadPath = path.join(__dirname, "../uploads/course");
      uploadPath = "uploads/course";

      console.log("uploadPath:", uploadPath);
    } else {
      // Handle other field names or provide a default folder
      // uploadPath = path.join(__dirname, "../uploads/default");
      uploadPath = "uploads/default";
      console.log("uploadPath:", uploadPath);
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;
