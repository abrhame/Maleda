const {
  product,
  productType,
  user,
  login,
  token,
  resetPassword,
  orderSchema,
  confirmPasswordSchema,
} = require("./joiValidationSchema");

module.exports = {
  addProductValidation: async function (req, res, next) {
    console.log(req.body);
    const value = await product.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addProductTypeValidation: async function (req, res, next) {
    const value = await productType.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addUserValidation: async function (req, res, next) {
    const value = await user.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addLoginValidation: async function (req, res, next) {
    const value = await login.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addTokenValidation: async function (req, res, next) {
    const value = await token.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addresetPasswordValidation: async function (req, res, next) {
    const value = await resetPassword.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addOrderValidation: async function (req, res, next) {
    const value = await orderSchema.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
  addPasswordValidation: async function (req, res, next) {
    const value = await confirmPasswordSchema.validate(req.body);
    if (value.error) {
      return res
        .json({
          msg: value.error.details[0].message,
        })
        .status(403);
    }
    next();
  },
};
