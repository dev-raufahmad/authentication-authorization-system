const mongoose = require('mongoose');

const session = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    expiry : {
        type : Date,
        default : Date.now,
        expires : 60 * 60 * 24 * 7
    }
})



module.exports = mongoose.model('session' , session);