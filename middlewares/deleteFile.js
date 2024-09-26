const fs = require("fs");
const path = require("path");
const { mappingPaths } = require("../utils/deleteFileFn");

const deleteFile = (Model) => {
  return async (req, res, next) => {
    try {
      const itemId = req.headers["id"];
      if (!itemId) {
        return res.status(400).json({ msg: "No item ID provided in headers" });
      }

      const item = await Model.findById(itemId); // Use the passed model
      if (!item) {
        return res.status(404).json({ msg: "item not found" });
      }

      const filePaths = item.image;
      if (!filePaths) {
        return res.status(400).json({ msg: "No file path found in the item" });
      }

      await mappingPaths(filePaths, req, res);

      next();
    } catch (error) {
      console.error(`Error in deleteFile: ${error.message}`);
      return res.status(500).json({ msg: "Server Error" });
    }
  };
};

module.exports = deleteFile;
