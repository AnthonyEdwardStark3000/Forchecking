const http = require('http');
const express = require('express');
const app = express();
app.use('/add-product',(req, res, next)=>{
    console.log(`Add Product`);
    res.send(`<h1>Add product</h1>`);
});
app.use('/',(req, res, next)=>{
    console.log(`In req 2`);
    res.send(`<h1>Hello Express</h1>`);
    // next();
});
const server = http.createServer(app);

server.listen(3000);