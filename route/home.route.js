const { generateOTP, verifyOTP, signUp, login, profile, deleteStudent } = require('../controller/home.controller');
const upload = require('../config/multer.config.js')
const express = require('express');
const userAlreadyExist = require('../middleware/userAlreadtExist.js');
const authorization = require('../middleware/userBasedAuthorization.js');
const verifySession = require('../middleware/verifySession.js');

const router = express.Router();

// router.get('/login', )
router.get('/generate-otp' , generateOTP )
router.get('/verify-otp' , verifyOTP)
router.post('/sign-up' ,upload.single('profile') ,  userAlreadyExist ,signUp)
router.get('/login' , login);
router.get('/profile' ,require('../middleware/verifySession.js'),profile );
router.get('/delete-student' , verifySession , authorization('admin') , deleteStudent )
module.exports = router;