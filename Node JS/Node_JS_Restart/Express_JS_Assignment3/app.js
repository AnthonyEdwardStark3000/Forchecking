const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const DefaultRouteData = require('./routes/default');
const AddUserRouteData = require('./routes/users');
const ErrorRouteData = require('./routes/error');
//setting view engine
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));
// Using External css
app.use(express.static(path.join(__dirname,'public')));

app.use(AddUserRouteData.route);
app.use(DefaultRouteData.route);
app.use(ErrorRouteData.route);

app.listen(4000,()=>{console.log('Server started at port 4000');});