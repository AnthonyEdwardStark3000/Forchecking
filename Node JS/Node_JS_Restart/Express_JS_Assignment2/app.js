const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app =express();
//
const Greet = require('./routes/welcome');
const UserEntry = require('./routes/user_entry');
//
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(UserEntry);
app.use(Greet);
console.log('Server Started at port 3000');
app.listen(3000);