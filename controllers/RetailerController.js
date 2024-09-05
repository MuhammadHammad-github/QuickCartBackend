const { Retailer } = require("../models/");
const { update } = require("../utils");
const { create, login, getAccount } = require("../utils/authCrud");

const createRetailer = async (req, res) => {
  await create(res, req.body, Retailer);
};
const loginRetailer = async (req, res) => {
  await login(res, req.body, Retailer);
};
const getRetailer = async (req, res) => {
  await getAccount(res, { id: req.id }, Retailer);
};
const updateRetailer = async (req, res) => {
  await update(res, req.body, Retailer, req.id);
};
module.exports = { createRetailer, getRetailer, loginRetailer, updateRetailer };
