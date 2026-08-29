const mailer = require('../config/nodemailer.config.js');
const optSession = require('../model/OTPsession.model.js');
const user = require("../model/user");

const signUp = async ( req , res ) => {
    const { firstName , lastName , profile , email , password , role } = req.body;
    if(!firstName || !profile || !email || !password || !role){
        return res.status(400).json({
            message : "Incomplete information"
        })
    }
    const userExist = user.findOne({ email : email });
    if(userExist){
        return res.status(400).json({ message : "User with this gmail already exist" })
    }
    const newUser = await user.create({
        firstName : firstName,
        lastName : lastName || "",
        email : email,
        password : password,
        role : role
    })
}

const generateOTP = async ( req , res ) => {
    console.log("The query is : " , req.query);
    
    try {
        if(!req.query.email) return res.json({ message : "Provide email" })
    const sessionFind = await optSession.findOne({ email : req.query.email })
    if(sessionFind) return res.json({ message : "OTP alreday generated" })
    const otp = String(Math.random() * 1000000).slice(0,4);
    console.log("THe opt that is generated is : " , otp);
    await mailer.sendMail({
        to : req.query.email,
        from : process.env.FROM,
        subject : "Login otp",
        text : `Your otp is : ${otp}`,
    })
    await optSession.create({ email : req.query.email , otp : otp })
    return res.json({
        message : "OTP generated Successfully"
    })
    } catch (error) {
        console.log("There is the error in the generation of the token and the error is : \n" , error);
        return res.status(399).json({ message : "Error in the generation of the OTP" })
    }
}


const verifyOTP = async ( req , res ) => {
    try {
        const { email , otp } = req.query;
    if(!email || !otp) return res.json({ message : "Incomplete cridentials" });
    const data = await optSession.findOne({ email , otp })
    console.log("THe data in the verfy otp is : " , data);
    if(!data){
        return res.json({
            message : "Invalid OTP"
        })
    }
    return res.json({
        message : "Successful"
    })
    } catch (error) {
        console.log("There is error in the verification of the otp and the error is : \n" , error);
        return res.json({
            message : "Invalid OTP"
        })
    }
} 


module.exports = { signUp , generateOTP , verifyOTP}