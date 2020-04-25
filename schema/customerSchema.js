let mongoose = require('mongoose')
let customerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
})
module.exports = customerSchema