const { Product } = require("../models/");
const { update, create, readOne } = require("../utils");
const { readBy, deleteItem } = require("../utils/crud");

const createProduct = async (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host");
  if (!req.file) return response(res, 404, { message: "File Not Uploaded!" });
  const filePath = req.file.path.replace(/\\/g, "/");
  await create(
    res,
    { ...req.body, retailer: req.id, image: filePath },
    Product
  );
};
const getProduct = async (req, res) => {
  await readOne(res, { id: req.headers["id"] }, Product);
};

const getProductsByRetailer = async (req, res) => {
  await readBy(res, { retailer: req.id }, Product);
};
const updateProduct = async (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host");
  let query;
  if (req.file) {
    const filePath = req.file.path.replace(/\\/g, "/");

    query = {
      ...req.body,
      image: {
        filePath: `${fullUrl}/${filePath}`,
        fileName: req.file.filename,
      },
    };
  } else query = req.body;
  await update(res, query, Product, req.headers["id"]);
};
const deleteProduct = async (req, res) => {
  await deleteItem(res, { id: req.headers["id"] }, Product);
};
module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  getProductsByRetailer,
  deleteProduct,
};
