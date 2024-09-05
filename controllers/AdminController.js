const { create, getAccount, login } = require("../utils/authCrud");
const { Admin } = require("../models/");

const createAdmin = async (req, res) => {
  await create(res, req.body, Admin);
};
const loginAdmin = async (req, res) => {
  await login(res, req.body, Admin);
};
const getAdmin = async (req, res) => {
  await getAccount(res, { id: req.id }, Admin);
};
module.exports = { createAdmin, getAdmin, loginAdmin };
