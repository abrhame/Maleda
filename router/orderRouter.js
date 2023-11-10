const router = require("express").Router()


const { addOrderValidation } = require("../utils/joiValidation");

const { CreateOrder, viewOrders, viewOneOrder, PickedUp } = require("../controller/requestController");

router.post("/", addOrderValidation, CreateOrder);

router.get("/", viewOrders);

router.get("/:id", viewOneOrder);

router.put("/:id", PickedUp);




module.exports = router;
