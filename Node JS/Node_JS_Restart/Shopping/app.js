const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

// adding pug as view engine 

// app.set('view engine','pug');
// app.set('views','views');

//adding handlebar as view engine 

// app.engine('hbs', expressHbs({layoutsDir:'views/layouts/',defaultLayout:'main-layout',extname:'hbs'}));
// app.set('view engine', 'hbs');
// app.set('views','views');

//adding ejs as view engine 
app.set('view engine','ejs');
app.set('views','views');

// Local Imports
const AdminRoutesData = require('./routes/admin');
const UserRoutes = require('./routes/shop');
const ErrorRoutes = require('./routes/404');
// Using External css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(bodyParser.urlencoded({extended: true}));
app.use('/admin',AdminRoutesData.route);
app.use(UserRoutes);
app.use(ErrorRoutes);

app.listen(3000);