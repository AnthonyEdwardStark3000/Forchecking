const express = require('express');
const app = express();
const path = require('path');

const movieRoutes = require('./routes/movies.js');
const adminRoutes = require('./routes/admin.js');
const rootFolder = require('./util/path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , 'public')));

app.use('/admin',adminRoutes);
app.use(movieRoutes);

app.use(function(req, res, next){
    res.status(200).render('404',{pageTitle:'Page not Found !',content: 'Page is not Found !'});
});

app.listen(4000, function(req, res, next){
    console.log("Server started at port 4000.");
});