const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productTypeSchema = new Schema({
    title: {
        type: String,
        required: true
    },

})

const ProductType = model("ProductType", productTypeSchema);

module.exports = ProductType;