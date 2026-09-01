const session = require('../model/session.model.js');
const jwt = require('jsonwebtoken');


const verifySession = async ( req , res , next ) => {

    try {
        const cookies = req.cookies;
    if(cookies == null) return res.json({ message : "Unauthorized user" })
    if(cookies.login){
        const decode = jwt.verify(cookies.login , process.env.JWT_KEY);
        req.user = decode;
        return next();
    }
    if(!(cookies.sessionToken)) return res.json({ message : "Unauthorized user" })
    const database = await session.findOne({ sessionToken : cookies.sessionToken });
    if(database == null) return res.json({ message : "Unauthorized user" });
    const token = jwt.sign({
        email : database.email,
        role : database.role
    } , process.env.JWT_KEY);
    req.user = {email : database.email,
        role : database.role}
    res.cookie('login' , token)
    return next();
    } catch (error) {
        console.log("Here is the error in the verify session named middleware and the error is : " , error);
        return res.json({ message : "Unauthorized user" })
    }
}



module.exports = verifySession;