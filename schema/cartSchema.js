let mongoose = require('mongoose')
let cartSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    productList:{
        type:Array,
        required:true
    }
})
module.exports = cartSchema