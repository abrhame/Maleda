const router = require("express").Router();
const isAdmin = require("../utils/isAdmin");
const dashboardController = require("../controller/dashboardController");

router.get("/totalrevenue", isAdmin, dashboardController.getTotalRevenue);
router.get("/mostOrdered", isAdmin, dashboardController.todayMostOrdered);
router.get("/totalorder", isAdmin, dashboardController.allOrder);

module.exports = router;
