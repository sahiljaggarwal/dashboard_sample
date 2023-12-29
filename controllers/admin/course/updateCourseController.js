const Course = require("../../../models/Course");

async function deleteFile(filePath) {
  try {
    // Extract the relative path from the URL
    const relativePath = new URL(filePath).pathname;
    const fullPath = path.join(__dirname, "../../../", relativePath);
    await fs.promises.unlink(fullPath);
    console.log("File deleted successfully:", filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

async function updateCourse(req, res) {
  try {
    const course = req.params.courseId;
    const updatedData = req.body;
    const coverPicture = req.files.coverPicture;

    const result = await Course.findByIdAndUpdate(course, updatedData, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    let coverPictureOldPath = result.coverPicture;

    if (coverPicture) {
      try {
        result.coverPicture = `http://localhost:4000/${coverPicture[0].path}`;
        if (coverPicture) {
          await deleteFile(coverPictureOldPath);
          console.log("Cover Picture Deleted SuccessFully");
        }
      } catch (error) {
        console.log("Error on deleting cover file");
        console.log(error);
      }
    }
    return res
      .status(200)
      .json({ message: "Course Updated Succes", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}

module.exports = updateCourse;
