const { create, getAccount, login } = require("../utils/authCrud");
const { Admin } = require("../models/");
const tryCatchError = require("../utils/tryCatchError");
const response = require("../utils/response");

const createAdmin = async (req, res) => {
  await create(res, req.body, Admin);
};
const loginAdmin = async (req, res) => {
  await login(res, req.body, Admin);
};
const checkAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0)
      return response(res, 404, { message: "No admin found!" });
    return response(res, 200, { message: "Admin Found!" });
  } catch (error) {
    tryCatchError(res, error);
  }
};
const getAdmin = async (req, res) => {
  await getAccount(res, { id: req.id }, Admin);
};
module.exports = { createAdmin, getAdmin, loginAdmin, checkAdmin };
