const express = require("express");
const {
  getAdmin,
  createAdmin,
  loginAdmin,
  checkAdmin,
} = require("../../controllers/AdminController");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const router = express.Router();

router.get("/", verifyAuthToken, getAdmin);
router.get("/checkAdmin", checkAdmin);
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
