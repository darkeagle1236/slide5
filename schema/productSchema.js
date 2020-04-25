let mongoose = require('mongoose')
let productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
})
module.exports = productSchema