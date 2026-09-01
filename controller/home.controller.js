const mailer = require('../config/nodemailer.config.js');
const optSession = require('../model/OTPsession.model.js');
const sessionModel = require('../model/session.model.js');
const user = require("../model/user");
const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const signUp = async ( req , res ) => {
    const { firstName , lastName , email , password , role } = req.body;
    const file = req.file;
    console.log("The file in the sign up is : " , file);
    
    if(!firstName || !file || !email || !password || !role){
        return res.status(400).json({
            message : "Incomplete information"
        })
    }
    const profile = path.join(process.cwd() , "/public" , `/${req.body.email}`)
    const newUser = await user.create({
        firstName : firstName,
        lastName : lastName || "",
        email : email,
        password : password,
        role : role,
        profile : profile
    })
    console.log("The result of the new user is : " , newUser);
    return res.json({
        message : "Successful"
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
    if(!data || data == null){
        return res.json({
            message : "Invalid OTP"
        })
    }
    console.log("THe data we get from the varify otp is : " , data);
    await optSession.deleteOne({ email : email });
    console.log("THe data we get from the varify otp after deletion is : " , await optSession.findOne({ email : email }));
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

const login = async ( req , res ) => {
    try {
        console.log("We have entered the login route");
    
    const { email , password } = req.query;
    const userExist = await user.findOne({ email : email , password : password });
    console.log("The value of the user ezxdt in the login is : " , userExist);
    if(userExist== null) return res.json({message :"Unauthorizeed user" })
    const seesionToken = crypto.randomBytes(64).toString('hex');
    const loginCokkie = jwt.sign({
        email : userExist.email,
        role : userExist.role
    },process.env.JWT_KEY)
    res.cookie('login' , loginCokkie , {
        httpOnly : true,
        maxAge: 60 * 15 * 1000
    })
    console.log("We are just before the seesion model");
    await sessionModel.deleteOne({ email : email })
    await sessionModel.create({
        email : email,
        sessionToken : seesionToken,
        role : userExist.role
    })
    res.cookie('sessionToken' , seesionToken , {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * 7
    })
    return res.json({
        message : "Successful"
    })
    } catch (error) {
        console.log("THere is error in the login function and the error is : \n" , error);
        return res.json({ message : "Can't login" })
    }
}

const profile = ( req , res ) => {
    return res.json({ message : "We got accesss to the profile" })
}

const deleteStudent = ( req ,res ) => {
    return res.json({ message : "Student has been deleted" })
}

module.exports = { deleteStudent , signUp , generateOTP , verifyOTP , login , profile}