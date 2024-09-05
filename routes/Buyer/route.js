const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const {
  getBuyer,
  createBuyer,
  loginBuyer,
  updateBuyer,
} = require("../../controllers/BuyerController");

const router = express.Router();
router.get("/", verifyAuthToken, getBuyer);
router.post("/create", createBuyer);
router.post("/login", loginBuyer);
router.post("/update", verifyAuthToken, updateBuyer);
module.exports = router;
