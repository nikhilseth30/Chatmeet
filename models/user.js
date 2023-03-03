const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String, //nikhil
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    pic:{
        type:String,
        default:"https://images.unsplash.com/photo-1677012817795-83bcc284cadf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    followers:[{ //["abhishek","nikhil","honey","shivanshu","vedant"]
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model('User',userSchema)
