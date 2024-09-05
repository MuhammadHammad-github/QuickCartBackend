const fs = require("fs");
const path = require("path");
const Blog = require("../schema/Blog");

const deleteFile = async (req, res, next) => {
  try {
    const blogId = req.headers["id"];
    if (!blogId) {
      return res.status(400).json({ msg: "No blog ID provided in headers" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const filePath = blog.image.filePath;
    if (!filePath) {
      return res.status(400).json({ msg: "No file path found in the blog" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const relativePath = filePath.replace(baseUrl, "");
    const absoluteFilePath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(absoluteFilePath)) {
      fs.unlink(absoluteFilePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).send("Error deleting file");
        }
        next();
      });
    } else {
      console.error("File not found:", absoluteFilePath);
      next();
    }
  } catch (error) {
    console.error(`Error in deleteFile: ${error.message}`);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = deleteFile;
