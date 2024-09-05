const { create, getAccount, login } = require("../utils/authCrud");
const { Buyer } = require("../models/");
const { update } = require("../utils");

const createBuyer = async (req, res) => {
  await create(res, req.body, Buyer);
};
const loginBuyer = async (req, res) => {
  await login(res, req.body, Buyer);
};
const getBuyer = async (req, res) => {
  await getAccount(res, req.body, Buyer);
};
const updateBuyer = async (req, res) => {
  await update(res, req.body, Buyer, req.id);
};
module.exports = { createBuyer, getBuyer, loginBuyer, updateBuyer };
