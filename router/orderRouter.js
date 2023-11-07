const router = require("express").Router()


const { addOrderValidation } = require("../utils/joiValidation");

const { CreateOrder, viewOrders, viewOneOrder } = require("../controller/requestController");

router.post("/", addOrderValidation, CreateOrder);

router.get("/", viewOrders);

router.get("/:id", viewOneOrder);




module.exports = router;