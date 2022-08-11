// const http = require('http');

const express = require('express');
// const expressHbs = require('express-handlebars');
const app = express();

// app.engine('handlebars',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

// app.set('view engine', 'pug');
const path = require('path');


const adminData = require('./routes/admin.js');
const shopRoute = require('./routes/shop.js');
const rootFolder = require('./util/path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoute);


// const server = http.createServer(app);
// server.listen(3000, function(){
//     console.log("Server started at port 30001");
// });

app.use(function(req, res, next){
    // res.status(400).sendFile(path.join(rootFolder, './', 'views', '404.html'));
    res.status(400).render('404',{content:'Page Not Found !', pageTitle:'Page Not Found !'});
});

app.listen(3000,function(){
    console.log("Server started at port 3000");
});