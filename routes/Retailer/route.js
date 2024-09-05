const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const {
  getRetailer,
  createRetailer,
  updateRetailer,
  loginRetailer,
} = require("../../controllers/RetailerController");

const router = express.Router();
router.post("/create", createRetailer);
router.post("/login", loginRetailer);
router.get("/", verifyAuthToken, getRetailer);
router.post("/update", verifyAuthToken, updateRetailer);
module.exports = router;
