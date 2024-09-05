const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const {
  getProduct,
  createProduct,
  updateProduct,
  getProductsByRetailer,
  deleteProduct,
} = require("../../controllers/ProductController");
const upload = require("../../middlewares/uploadFile");
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

router.get("/", getProduct);
router.get("/retailerProducts", verifyAuthToken, getProductsByRetailer);
router.post("/create", verifyAuthToken, upload.single("image"), createProduct);
router.put(
  "/update",
  verifyAuthToken,
  conditionalUpload,
  conditionalDelete,
  updateProduct
);
router.delete("/delete", verifyAuthToken, deleteFile, deleteProduct);

module.exports = router;
