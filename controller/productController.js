const wrapAsync = require("../utils/wrapAsync");
const Products = require("../models/Products");
const ProductType = require("../models/ProductType");

module.exports.CreateProduct = wrapAsync(async (req, res) => {
  if (!req.files.length) {
    return res.json({
      msg: "Image is Required",
    });
  }
  const files = req.files;
  const paths = [];

  files.map((file) => {
    // console.log(file);
    let newGallery = file.path;
    paths.push(newGallery);
  });

  const category = await ProductType.findOne({
    title: req.body.productType,
  });
  //   console.log(req.body.productType, "category");
  if (!category) {
    return res.json({
      msg: "No such category",
    });
  }
  const data = {
    productName: String(req.body.productName),
    imgPath: paths,
    price: Number(req.body.price),
    qtyLeft: Number(req.body.qtyLeft),
    description: String(req.body.description) || "",
  };

  const newProduct = new Products(data);

  newProduct.productCategory = category;

  const saved = await newProduct.save();

  if (!saved) {
    return res
      .json({
        msg: "Error while creating new product",
      })
      .status(400);
  }

  return res.json({
    msg: "Created Product Successfully",
  });
});

module.exports.EditProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!req.files.length) {
    return res.json({
      msg: "Image is Required",
    });
  }
  const files = req.files;
  const paths = [];

  files.map((file) => {
    // console.log(file);
    let newGallery = file.path;
    paths.push(newGallery);
  });

  const category = await ProductType.findOne({
    title: req.body.productType,
  });
  //   console.log(req.body.productType, "category");
  if (!category) {
    return res.json({
      msg: "No such category",
    });
  }
  const data = {
    productName: String(req.body.productName),
    imgPath: paths,
    price: Number(req.body.price),
    qtyLeft: Number(req.body.qtyLeft),
    productCategory: category,
  };

  const productEdited = await Products.findByIdAndUpdate(id, data);

  if (!productEdited) {
    return res
      .json({
        msg: "Product Edit Failed",
      })
      .status(400);
  }

  return res
    .json({
      msg: "Product Editied Successfully",
    })
    .status(200);
});

module.exports.DeleteProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const idExist = await Products.findById(id);
  if (!idExist) {
    return res
      .json({
        msg: "Invalid Product Id",
      })
      .status(400);
  }

  const deleteStatus = await Products.findByIdAndRemove(id);
  if (!deleteStatus) {
    return res
      .json({
        msg: "Error while deleting product",
      })
      .status(500);
  }

  return res
    .json({
      msg: "Product Deleted Successfully",
    })
    .status(200);
});

module.exports.GetAllProducts = wrapAsync(async (req, res) => {
  const allProducts = await Products.find().populate("productCategory");
  return res
    .json({
      msg: allProducts,
    })
    .status(200);
});

module.exports.GetOneProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id).populate("productCategory");

  if (!product) {
    return res
      .json({
        msg: "No such products",
      })
      .status(400);
  }

  return res
    .json({
      msg: product,
    })
    .status(200);
});

module.exports.SearchCategory = wrapAsync(async (req, res) => {
  const { category } = req.params;
  const iscategory = await ProductType.findOne({ title: category });

  if (!iscategory) {
    return res
      .json({
        msg: "No such category",
      })
      .status(400);
  }

  const products = Products.find({ productCategory: iscategory._id });

  return res
    .json({
      payload: products,
    })
    .status(200);
});
