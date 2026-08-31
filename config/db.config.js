const mongoose = require('mongoose');


const connectionWithDB = async ( url ) => {
    try {
        await mongoose.connect(url);
        console.log("DB connected");
        
    } catch (error) {
        console.log("Error in the connetion of the db and the error is : " , error);
        
    }
}


module.exports = connectionWithDB;