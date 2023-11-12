const Requests = require("../models/Requests");

const wrapAsync = require("../utils/wrapAsync");

module.exports.getTotalRevenue = wrapAsync(async (req, res) => {
  const requests = await Requests.find();

  let totalPrice = 0;
  for (let request of requests) {
    totalPrice += request.totalPrice;
  }

  return res
    .json({
      payload: totalPrice,
    })
    .status(200);
});

module.exports.todayMostOrdered = wrapAsync(async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(00, 00, 00));
  const endOfDay = new Date(today.setHours(23, 59, 59));
  const mostOccurredProduct = await Requests.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $unwind: "$productInfo",
    },
    {
      $group: {
        _id: "$productInfo.id",
        totalQuantity: { $sum: "$productInfo.quantity" },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const products = mostOccurredProduct.length > 0 ? mostOccurredProduct : null;

  res
    .json({
      products,
    })
    .status(200);
});

module.exports.allOrder = wrapAsync(async (req, res) => {
  const orders = Requests.find();

  return res
    .json({
      payload: orders.length,
    })
    .status(200);
});
