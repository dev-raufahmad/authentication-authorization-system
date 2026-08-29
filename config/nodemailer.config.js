const mailer = require('nodemailer');


const mail = mailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.USER,
        pass : process.env.AUTH_PASSWORD
    }
})

module.exports = mail;