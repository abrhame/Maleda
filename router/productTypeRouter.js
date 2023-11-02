const router = require("express").Router();

const productController = require("../controller/productTypeController");
const isAdmin = require("../utils/isAdmin");
const { addProductTypeValidation } = require("../utils/joiValidation");

router.get("/", productController.getAllCategory);
router.post(
  "/",
  isAdmin,
  addProductTypeValidation,
  productController.CreateCategory
);
router.put(
  "/:id",
  isAdmin,
  addProductTypeValidation,
  productController.UpdateCategory
);
router.delete("/:id", isAdmin, productController.DeleteCategory);

module.exports = router;
