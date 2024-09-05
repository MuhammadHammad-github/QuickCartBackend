const { Order } = require("../models/");
const { update, create, readOne, read } = require("../utils");
const { readBy } = require("../utils/crud");

const createOrder = async (req, res) => {
  await create(res, { ...req.body, buyer: req.id }, Order);
};
const getOrder = async (req, res) => {
  await readOne(res, { id: req.headers["id"] }, Order);
};
const getOrdersByBuyer = async (req, res) => {
  await readBy(res, { buyer: req.id }, Order);
};
const getOrdersByRetailer = async (req, res) => {
  await readBy(res, { retailer: req.id }, Order);
};
const updateOrder = async (req, res) => {
  await update(res, req.body, Order, req.headers["id"]);
};
module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  getOrdersByBuyer,
  getOrdersByRetailer,
};
