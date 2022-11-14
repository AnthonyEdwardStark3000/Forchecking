const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const name = 'User1';
app.use(bodyParser.urlencoded({extended: true}));

app.get('/add-product',(req,res,next)=>{
    res.send(`<form action='/product' method="POST"><input type="text" name="value"></input><button type="submit">Send</button></form>`);
});
app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});
app.get('/',(req,res,next)=>{
    res.send(`<h1>Welcome to Express JS</h1>`);
});

app.listen(3000);