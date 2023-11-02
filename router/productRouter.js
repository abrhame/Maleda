const router = require("express").Router();
const productController = require("../controller/productController");
const { addProductValidation } = require("../utils/joiValidation");

const isAdmin = require("../utils/isAdmin");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMonth() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const images = upload.array("images");

router.get("/", productController.GetAllProducts);
router.get("/category/:category", productController.SearchCategory);
router.get("/:id", productController.GetOneProduct);
router.post(
  "/",
  isAdmin,
  images,
  addProductValidation,
  productController.CreateProduct
);
router.put(
  "/:id",
  isAdmin,
  addProductValidation,
  images,
  productController.EditProduct
);
router.delete("/:id", isAdmin, productController.DeleteProduct);

module.exports = router;
