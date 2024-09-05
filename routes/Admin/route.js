const express = require("express");
const {
  getAdmin,
  createAdmin,
  loginAdmin,
} = require("../../controllers/AdminController");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const router = express.Router();

router.get("/", verifyAuthToken, getAdmin);
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
