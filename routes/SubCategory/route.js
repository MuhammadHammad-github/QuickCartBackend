const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const {
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
} = require("../../controllers/SubCategoryController");
const upload = require("../../middlewares/uploadFile");
const deleteFile = require("../../middlewares/deleteFile");
const { SubCategory } = require("../../models");

const router = express.Router();

const conditionalUpload = (req, res, next) => {
  if (req.headers["content-type"].startsWith("multipart/form-data")) {
    return upload.single("image")(req, res, next);
  }
  next();
};
const conditionalDelete = (req, res, next) => {
  if (req.headers["content-type"].startsWith("multipart/form-data"))
    return deleteFile(req, res, next);
  next();
};

router.get("/", getSubCategories);
router.get("/byCategory", getSubCategoriesByCategory);
router.get("/one", getSubCategory);
router.post(
  "/create",
  verifyAuthToken,
  upload.single("image"),
  createSubCategory
);
router.put(
  "/update",
  verifyAuthToken,
  conditionalUpload,
  conditionalDelete,
  updateSubCategory
);
router.delete(
  "/delete",
  verifyAuthToken,
  deleteFile(SubCategory),
  deleteSubCategory
);

module.exports = router;
