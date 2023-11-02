const router = require("express").Router();

const productController = require("../controller/productTypeController");
const isAdmin = require("../utils/isAdmin");

router.get("/", productController.getAllCategory);
router.post("/", isAdmin, productController.CreateCategory);
router.put("/:id", isAdmin, productController.UpdateCategory);
router.delete("/:id", isAdmin, productController.DeleteCategory);

module.exports = router;
