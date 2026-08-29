require('dotenv').config();
const express = require('express');
const homeRouter = require('./route/home.route.js');
const connectionWithDB = require('./config/db.config.js');

const app = express();



app.listen(process.env.PORT , () => {
    console.log("Server is running on the port number ");
    connectionWithDB("mongodb://localhost:27017/")
})


app.get('/',(req , res) => {
    return res.json({
        message : "Successful"
    })
}) 


app.use('/' , homeRouter )