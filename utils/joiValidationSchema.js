const joi = require("@hapi/joi");

const product = joi.object({
  title: joi.string().required(),
  id: joi.string().required(),
  totalPrice: joi.number().required(),
  quantity: joi.number().required(),
  instruction: joi.string(),
});

const schema = {
  product: joi.object({
    productName: joi.string().required(),
    productType: joi.string().required(),
    price: joi.string().required(),
    description: joi.string(),
    qtyLeft: joi.string(),
  }),

  productType: joi.object({
    title: joi.string().required(),
  }),
  user: joi.object({
    userName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirm_password: joi.string().required(),
  }),
  login: joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
  token: joi.object({
    token: joi.string().required(),
  }),
  resetPassword: joi.object({
    email: joi.string().required(),
  }),

  orderSchema: joi.object({
    cart: joi.array().items(product).required(),
    user: joi.object({
      userName: joi.string().required(),
      userEmail: joi.string().required(),
      userPhoneNumber: joi.string().required(),
      payed: joi.boolean().required(),
      pickUpTime: joi.string().required(),
      totalPrice: joi.number().required(),
    }),
  }),
  confirmPasswordSchema: joi.object({
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
  }),
};

module.exports = schema;
