const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const io = require("./server").io;
const app = require("./server").app;
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb://localhost/maleda";
mongoose
  .connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected To Database Successfully");
  })
  .catch((e) => {
    console.log("Error While Connecting to Database");
    console.log(e);
  });

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const productRouter = require("./router/productRouter");

const authRouter = require("./router/authRouter");

const categoryRouter = require("./router/productTypeRouter");

// app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/producttype", categoryRouter);

app.use("*", function (req, res, next) {
  next(new ExpressError("Page Not Found", 404));
});

app.use(function (err, req, res, next) {
  const { statusCode = 500 } = err;

  if (!err.message) {
    err.message = "Someting Went Wrong";
  }

  res.json({
    msg: err,
    status: statusCode,
  });
});
