const mongoose = require('mongoose');


const user = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        enum : [ "student" , "admin" , "manager" ]
    }
})


module.exports = mongoose.model('user' , user);