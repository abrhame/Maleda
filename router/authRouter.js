const router = require("express").Router();

const authController = require("../controller/authController");

const {
  addUserValidation,
  addLoginValidation,
  addTokenValidation,
  addresetPasswordValidation,
} = require("../utils/joiValidation");

router.post("/signup", addUserValidation, authController.RegisterUser);
router.post("/login", addLoginValidation, authController.LoginUser);
router.post("/verifyToken", addTokenValidation, authController.verifyUserToken);
router.post(
  "/forgetpassword",
  addresetPasswordValidation,
  authController.resetPassword
);
router.post("/changeforgetpassword", authController.changeForgetPassword);

module.exports = router;
