const ProductType = require("../models/ProductType")
const wrapAsync = require("../utils/wrapAsync");

module.exports.CreateCategory = wrapAsync(async (req, res)=>{

    const data = {
        title:req.body.title
    }
    const newCategory = new ProductType(data);
    const saved = await newCategory.save();

    return res.json({
        msg:"New category added successfully"
    })

})


module.exports.UpdateCategory = wrapAsync(async (req, res)=>{

    const data = {
        title:req.body.title
    }

    const {id} = req.params;

    const updated = await ProductType.findByIdAndUpdate(id, data)

    if(!updated){
        return res.json({
            msg:"Error while updating data"
        }).status(400)
    }

    return res.json({
        msg:"Category Updated Successfully"
    }).status(200)
})

module.exports.DeleteCategory = wrapAsync(async (req, res)=>{
    const {id} = req.params;

    const deleted = await ProductType.findByIdAndDelete(id);

    if(!deleted){
        return res.json({
            msg:"Such id doesnt exist"
        }).status(400)
    }

    return res.json({
        msg:"Product category deleted successfully"
    }).status(200)
})

module.exports.getAllCategory = wrapAsync(async (req, res)=>{
    const all = await ProductType.find();

    return res.json({
        msg:all
    }).status(200)
})

