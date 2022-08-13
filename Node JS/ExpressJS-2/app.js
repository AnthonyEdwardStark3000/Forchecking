// const http = require('http');

const express = require('express');
// const expressHbs = require('express-handlebars');
const app = express();

// app.engine('handlebars',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

// app.set('view engine', 'pug');
const path = require('path');


const adminRoute = require('./routes/admin.js');
const shopRoute = require('./routes/shop.js');
// const rootFolder = require('./util/path');

const bodyParser = require('body-parser');
const NoPage = require('./controllers/pageRedirect.Controller.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , 'public')));

app.use('/admin',adminRoute);
app.use(shopRoute);


// const server = http.createServer(app);
// server.listen(3000, function(){
//     console.log("Server started at port 30001");
// });

app.use(NoPage.PageNotFound);

app.listen(3000,function(){
    console.log("Server started at port 3000");
});