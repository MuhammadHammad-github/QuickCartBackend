const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const upload = require("../../middlewares/uploadFile");
const deleteFile = require("../../middlewares/deleteFile");
const {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} = require("../../controllers/SlideController");
const Slide = require("../../models/Slide");
const router = express.Router();

const conditionalUpload = (req, res, next) => {
  if (req.headers["content-type"].startsWith("multipart/form-data")) {
    return upload.single("image")(req, res, next);
  }
  next();
};
const conditionalDelete = (Model) => {
  return (req, res, next) => {
    const contentType = req.headers["content-type"];

    if (contentType && contentType.startsWith("multipart/form-data")) {
      return deleteFile(Model)(req, res, next);
    }

    next();
  };
};

router.get("/", getSlides);
router.post("/create", verifyAuthToken, upload.single("image"), createSlide);
router.put(
  "/update",
  verifyAuthToken,
  conditionalUpload,
  conditionalDelete(Slide),
  updateSlide
);
router.delete("/delete", verifyAuthToken, deleteFile(Slide), deleteSlide);

module.exports = router;
