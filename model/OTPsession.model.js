const mongoose = require('mongoose');


const session = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    expiryTime : {
        type : Date,
        default : Date.now,
        expires : 300
    },
    otp : {
        type : String,
        require : true,
    }
})


module.exports = mongoose.model('session' , session);