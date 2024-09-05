const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
    retailer: { type: Schema.Types.ObjectId, ref: "Retailer", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
