const express = require("express");
const verifyAuthToken = require("../../middlewares/verifyAuthToken");
const {
  getOrder,
  createOrder,

  updateOrder,
  getOrdersByBuyer,
  getOrdersByRetailer,
} = require("../../controllers/OrderController");

const router = express.Router();
router.get("/", getOrder);
router.get("/buyerOrders", verifyAuthToken, getOrdersByBuyer);
router.get("/retailerOrders", verifyAuthToken, getOrdersByRetailer);
router.post("/create", verifyAuthToken, createOrder);
router.post("/update", verifyAuthToken, updateOrder);
module.exports = router;
