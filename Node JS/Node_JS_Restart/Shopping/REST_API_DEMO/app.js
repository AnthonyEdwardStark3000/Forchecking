const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const feedRoutes = require('./routes/feed');
const path = require('path');
const app = express();

//setting up CORS
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,PUT,GET,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next()
});

// app.use(bodyParser.urlencoded('false')); //x-www-form-urlencoded <form> </form>
app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/feed',feedRoutes);
app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
});
const connectionUrl = process.env.MONGODB_CONNECTION_URI;
mongoose.connect(connectionUrl)
.then(result=>{
    console.log('connected!');
    app.listen(8080,function(){
        console.log(`Server started at port 8080`);
    });
}).catch(err=>{
    console.log('Error while establishing the connection:',err);
});
