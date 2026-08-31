const user = require("../model/user")

const userAlreadyExist = async ( req , res , next ) => {
    const data = user.findOne({ email : req.body?.email });
    if (data) {
        return res.json({ message : "User with this email is already regostered" })
    }
    next()
}


module.exports = userAlreadyExist;