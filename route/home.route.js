const { generateOTP, verifyOTP } = require('../controller/home.controller');

const express = require('express');

const router = express.Router();

// router.get('/login', )
router.get('/generate-otp' , generateOTP )
router.get('/verify-otp' , verifyOTP)
module.exports = router;