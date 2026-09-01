require('dotenv').config();
const express = require('express');
const homeRouter = require('./route/home.route.js');
const connectionWithDB = require('./config/db.config.js');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use( express.json() );
app.use( cookieParser() );
app.use( cors({
    origin : "*",
    methods : [ "GET" , "POST" , "PUT" , "PATCH" , "DELETE" ]
}) )


app.listen(process.env.PORT , () => {
    console.log("Server is running on the port number : " , process.env.PORT);
    connectionWithDB(process.env.MONGO_URI);
})


app.get('/',(req , res) => {
    return res.json({
        message : "Successful"
    })
}) 


app.use('/' , homeRouter )