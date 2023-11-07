const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const requestSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userPhoneNumber :{
        type: String,
        required:true
    },
    userEmail:{
        type:String, 
        required:true
    },
    payed: {
        type: Boolean,
        default: false
    },
    productInfo: [
        [
            {
                id:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Products"
                },
                price:{
                    type:Number,
                }
            }
        ]
    ],
    timeOrder: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default: 0
    },
    reqStatus: {
        type: String,
        default: "not_picked",
        enum: ["not_picked", "picked"]
    }, 
    totalPrice:{
        type:Number,
        required:true
    }, 
    description:{
        type:String
    }
})

const Requests = model("Requests", requestSchema);

module.exports = Requests;