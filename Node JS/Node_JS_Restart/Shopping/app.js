const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

//Establish DB connection
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

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

// db.execute('SELECT * FROM products').then(result=>{
//     console.log(result[0]);
// }).catch(err=>{
//     console.log('Error during DB interaction:',err);
// });

// Using External css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(bodyParser.urlencoded({extended: true}));
app.use('/admin',AdminRoutesData.route);
app.use(UserRoutes);
app.use(ErrorRoutes);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

// sequelize.sync({force:true})
sequelize.sync()
.then((result)=>{
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({name:'checkUser',email:'checkUser01@gmail.com'});
    }
    return user
})
.then(user=>{
    console.log(user);
    app.listen(3000);
})
.catch((err)=>{
    console.log('error occurred while syncing:',err);
});