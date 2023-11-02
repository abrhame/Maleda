const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const requestSchema = new Schema({
    from: {
        type: string,
        required: true
    },
    payed: {
        type: boolean,
        default: false
    },
    productInfo: {
        type: mongoose.Types.ObjectId,
        ref: "Products"
    },
    timeOrder: {
        type: string,
        required: true
    },
    qty: {
        type: Number,
        default: 0
    },
    reqStatus: {
        type: string,
        default: "pending",
        enum: ["accepted", "pending", "rejected"]
    }
})

const Requests = model("Requests", requestSchema);

module.exports = Requests;