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

productSchema.pre("remove", async function (next) {
  const productId = this._id;

  // Delete requests associated with the product
  await mongoose.model("Requests").deleteMany({
    "productInfo.id": productId,
  });

  next();
});

const Products = model("Products", productSchema);

module.exports = Products;
