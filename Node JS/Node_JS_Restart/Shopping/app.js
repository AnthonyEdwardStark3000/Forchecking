const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

//Establish DB connection
// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

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
const mongoConnect = require('./util/database').mongoConnect;

const User = require("./models/user");
// db.execute('SELECT * FROM products').then(result=>{
//     console.log(result[0]);
// }).catch(err=>{
//     console.log('Error during DB interaction:',err);
// });

// Using External css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next)=>{
    // User.findByPk(1)
    // .then(
    //     user=>{
    //     req.user = user;next();
    // })
    // .catch(err=>{console.log(err)});
 
    // Mongodb
    User.findById("63821258a6fd1c6dcb92a7c0")
    .then(
        user=>{
        // req.user = user;
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err=>{console.log(err)});
});

app.use('/admin',AdminRoutesData.route);
app.use(UserRoutes);
app.use(ErrorRoutes);

// Associations for Sequelize



// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);   
// Cart.belongsToMany(Product,{through:CartItem});   
// Product.belongsToMany(Cart,{through:CartItem});   
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through: OrderItem});

// // sequelize.sync({force:true})
// sequelize.sync()
// .then((result)=>{
//     return User.findByPk(1);
// })
// .then(user=>{
//     if(!user){
//         return User.create({name:'checkUser',email:'checkUser01@gmail.com'});
//     }
//     return user
// })
// .then(user=>{
//     // console.log(user);
//     return user.createCart();
// })
// .then(cart=>{
//     app.listen(3000);   
// })
// .catch((err)=>{
//     console.log('error occurred while syncing:',err);
// });

//mongoDb
mongoConnect(()=>{
    app.listen(3000);
});