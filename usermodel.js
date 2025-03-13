const mongoose = require('mongoose');
require('dotenv').config()

const MongoDB_URI = process.env.MongoDB_URI

mongoose.connect(MongoDB_URI,{
    serverSelectionTimeoutMS: 30000
}).then(()=>{console.log("Connected")}).catch((err)=>{console.error(err)})

const userSchema = {
    name: String,
    age: Number,
    email: String,
    password: String
}

module.exports = mongoose.model("user",userSchema)