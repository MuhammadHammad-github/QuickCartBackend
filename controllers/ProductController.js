const { Product, Category, SubCategory } = require("../models/");
const {
  update,
  create,
  readOne,
  deleteItem,
  readBy,
  response,
  pushUpdate,
  pullUpdate,
} = require("../utils");

const createProduct = async (req, res) => {
  const fullUrl = req.protocol + "://" + req.get("host");
  if (!req.file) return response(res, 404, { message: "File Not Uploaded!" });
  const filePath = req.file.path.replace(/\\/g, "/");
  const product = await create(
    res,
    { ...req.body, retailer: req.id, image: `${fullUrl}/${filePath}` },
    Product,
    false
  );
  await pushUpdate(
    res,
    product._id,
    Category,
    product.category,
    "products",
    false
  );
  await pushUpdate(
    res,
    product._id,
    SubCategory,
    product.subCategory,
    "products",
    false
  );
  return response(res, 200, { message: "Created Successfully!" });
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
      image: `${fullUrl}/${filePath}`,
    };
  } else query = req.body;
  const product = await update(res, query, Product, req.headers["id"], false);
  if (req.body.category) {
    await pushUpdate(
      res,
      product._id,
      Category,
      product.category,
      "products",
      false
    );
    await pullUpdate(
      res,
      product._id,
      Category,
      product.category,
      "products",
      false
    );
  }
  if (req.body.subCategory) {
    await pushUpdate(
      res,
      product._id,
      SubCategory,
      product.subCategory,
      "products",
      false
    );
    await pullUpdate(
      res,
      product._id,
      SubCategory,
      product.subCategory,
      "products",
      false
    );
  }
  return response(res, 200, { message: "Data Updated!", product });
};
const deleteProduct = async (req, res) => {
  await pullUpdate(
    res,
    req.headers["id"],
    SubCategory,
    req.headers["subCategory"],
    "products",
    false
  );
  await pullUpdate(
    res,
    req.headers["id"],
    Category,
    req.headers["category"],
    "products",
    false
  );
  await deleteItem(res, { id: req.headers["id"] }, Product);
};
module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  getProductsByRetailer,
  deleteProduct,
};
