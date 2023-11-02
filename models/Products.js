const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: mongoose.Types.ObjectId,
    ref: "ProductType",
  },
  imgPath: [String],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  qtyLeft: {
    type: Number,
    default: 0,
  },
});

const Products = model("Products", productSchema);

module.exports = Products;
