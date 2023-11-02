const router = require('express').Router()

const authController = require("../controller/authController")

router.post('/signup', authController.RegisterUser)
router.post('/login', authController.LoginUser);
router.post('/verifyToken', authController.verifyUserToken);
router.post('/forgetpassword', authController.resetPassword);
router.post('/changeforgetpassword', authController.changeForgetPassword);

module.exports = router;