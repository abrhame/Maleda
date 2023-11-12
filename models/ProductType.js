const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

productTypeSchema.pre("remove", async function (next) {
  const productCategoryId = this._id;

  const associatedProducts = await mongoose
    .model("Products")
    .find({ productCategory: productCategoryId });

  await mongoose.model("Requests").deleteMany({
    "productInfo.id": { $in: associatedProducts.map((product) => product._id) },
  });

  await mongoose.model("Products").deleteMany({
    productCategory: productCategoryId,
  });

  next();
});

const ProductType = model("ProductType", productTypeSchema);

module.exports = ProductType;
