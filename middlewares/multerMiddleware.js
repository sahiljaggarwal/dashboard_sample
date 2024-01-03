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
      uploadPath = "uploads/course";
      console.log("uploadPath:", uploadPath);
    } else if (file.fieldname === "coverImage") {
      uploadPath = "uploads/cover";
      console.log("uploadPath:", uploadPath);
    } else if (file.fieldname === "featuredImage") {
      uploadPath = "uploads/featured";
      console.log("uploadPath:", uploadPath);
    } else if (file.fieldname === "portfolio") {
      uploadPath = "uploads/portfolio";
      console.log("uploadPath:", uploadPath);
    } else if (file.fieldname === "team") {
      uploadPath = "uploads/team";
      console.log("uploadPath:", uploadPath);
    } else if (file.fieldname === "student") {
      uploadPath = "uploads/student";
    } else {
      uploadPath = "uploads/default";
      console.log("uploadPath:", uploadPath);
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;

    if (!fileName) {
      return cb(new Error(`Image Uploading Error`), null);
    }
    cb(null, fileName);
  },
});

// Multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;
