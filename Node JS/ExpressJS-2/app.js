const http = require('http');

const express = require('express');
const app = express();

app.use((req, res, next)=>{
    console.log("In the Middleware 1");
    next();
});

app.use((req, res, next)=>{
    console.log("In the Middleware 2");
    res.send('HI');
});

const server = http.createServer(app);
server.listen(3000, function(){
    console.log("Server started at port 30001");
});