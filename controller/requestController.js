const Requests = require("../models/Requests");

const Products = require("../models/Products");

const wrapAsync = require("../utils/wrapAsync");

module.exports.CreateOrder = (async (req, res) => {
    const carts = req.body.cart;
    const user = req.body.user;

    // console.log(req.body)

    for(let cart of carts){
        const product = await Products.findById(cart.id);
        // console.log(product)
        const qty = product.qtyLeft - cart.quantity;
        if(qty < 0){
            return res.json({
                msg:"Not enough product"
            }).status(400)
        }
    }


    const data = {
        userName:user.userName,
        userEmail:user.userEmail,
        userPhoneNumber:user.userPhoneNumber,
        payed:user.payed, 
        timeOrder:user.pickUpTime,
        description:user.instructions,
        totalPrice : user.totalPrice
    }

   

    let productInfo = []
    for(let cart of carts){
        const product = await Products.findById(cart.id);
        const qty = product.qtyLeft - cart.quantity;
        await Products.findByIdAndUpdate(cart._id, {qtyLeft:qty});
        productInfo.push([cart._id, cart.totalPrice]);
    }

    data.productInfo = productInfo;

    await Requests.insertMany(data);

    return res.json({
        msg:`Checkout successful, don't forget to pick up on time`
    }).status(200)
})

module.exports.viewOrders = wrapAsync(async (req, res) => {
    const all_data = await Requests.find({}).populate("productInfo.id");
    return res.json({
        payload:all_data
    }).status(200)
})

module.exports.viewOneOrder = wrapAsync(async (req, res)=>{
    const {id} = req.params;

    const order = await Request.findById(id).populate("productInfo.id");

    if(!order){
        return res.json({
            msg:"Order not found"
        }).status(400)
    }

    return res.json({
        payload:order,
    }).status(200)
})

module.exports.PickedUp = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const request = await Requests.findById(id);

    if(!request){
        return res.json({
            msg:"Request not found"
        }).status(400)
    }

    await Requests.findByIdAndUpdate(id, {reqStatus:"picked"});

    return res.json({
        msg:"Picked up successfully"
    }).status(200)
})