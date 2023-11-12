const router = require("express").Router();

const authController = require("../controller/authController");

const isAdmin = require("../utils/isAdmin");

const {
  addUserValidation,
  addLoginValidation,
  addTokenValidation,
  addresetPasswordValidation,
  addPasswordValidation,
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

router.post(
  "/changepassword",
  isAdmin,
  addPasswordValidation,
  authController.ChangePassword
);

module.exports = router;
