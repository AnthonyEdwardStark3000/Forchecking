// const http = require('http');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/add-product',function(req, res, next){
    console.log("In middleware");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Click</button></form>')
});

app.use('/product',function(req, res, next){
    console.log(req.body);
    res.redirect('/');
});

app.use('/',function(req, res, next){
    console.log("Base Page");
    res.send('Mutton Kushkava');
});




// const server = http.createServer(app);
// server.listen(3000, function(){
//     console.log("Server started at port 30001");
// });

app.listen(3000,function(){
    console.log("Server started at port 3000");
});