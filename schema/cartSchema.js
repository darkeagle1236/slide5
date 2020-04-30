let mongoose = require('mongoose')
let cartSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})
module.exports = cartSchema