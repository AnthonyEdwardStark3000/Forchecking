const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
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
app.use('/feed',feedRoutes);

app.listen(8080,function(){
    console.log(`Server started at port 8080`);
});