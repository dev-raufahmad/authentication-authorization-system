const user = require("../model/user")

const userAlreadyExist = async ( req , res , next ) => {
    console.log("The body of the req is : " , req.body)
    const data = await user.findOne({ email : req.body.email });
    console.log("THe data in the user already exist is : " , data);
    
    if (data != null) {
        return res.json({ message : "User with this email is already regostered" })
    }
    return next()
}


module.exports = userAlreadyExist;