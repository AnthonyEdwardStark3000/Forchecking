const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Local Imports
const AdminRoutes = require('./routes/admin');
const UserRoutes = require('./routes/shop');
//
app.use(bodyParser.urlencoded({extended: true}));
app.use(AdminRoutes);
app.use(UserRoutes);

app.listen(3000);