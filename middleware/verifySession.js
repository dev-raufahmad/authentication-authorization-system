const session = require('../model/session.model.js');
const jwt = require('jsonwebtoken');


const verifySession = async ( req , res , next ) => {

    try {
        const cookies = req.cookies;
    if(cookies == null) return res.json({ message : "Unauthorized user" })
    if(cookies.login){
        jwt.verify(cookies.login , process.env.JWT_KEY);
        return next();
    }
    console.log("Ther was no login token");
    if(!(cookies.sessionToken)) return res.json({ message : "Unauthorized user" })
    console.log("The cookies are : " , req.cookies);
    const database = await session.findOne({ sessionToken : cookies.sessionToken });
    console.log("THe result of the finding of the seesion is : " , database);
    if(database == null) return res.json({ message : "Unauthorized user" });
    const token = jwt.sign({
        email : database.email,
        role : database.role
    } , process.env.JWT_KEY);
    res.cookie('login' , token)
    return next();
    } catch (error) {
        console.log("Here is the error in the verify session named middleware and the error is : " , error);
        
    }
}



module.exports = verifySession;