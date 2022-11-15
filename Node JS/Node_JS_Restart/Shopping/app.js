const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// Local Imports
const AdminRoutes = require('./routes/admin');
const UserRoutes = require('./routes/shop');
const ErrorRoutes = require('./routes/404');
// Using External css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(bodyParser.urlencoded({extended: true}));
app.use('/admin',AdminRoutes);
app.use(UserRoutes);
app.use(ErrorRoutes);

app.listen(3000);