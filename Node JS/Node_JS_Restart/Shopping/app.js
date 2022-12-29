const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const MongoDBStore = require('connect-mongodb-session')(session);

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
const mongoose = require('mongoose');

const MONGODB_CONNECTION_URI = 'mongodb+srv://suresh:4QxDcAZHwqDoB7BK@cluster0.c2cpwhf.mongodb.net/shop?retryWrites=true&w=majority';

const store = new MongoDBStore({
    uri:MONGODB_CONNECTION_URI,
    collection:'sessions',
});

const csrfProtection = csrf();

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
const AuthRoutes = require('./routes/auth');
// const mongoConnect = require('./util/database').mongoConnect;

//storage Object for multer
const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+'-'+file.originalname);
    }
});
const User = require("./models/user");
// db.execute('SELECT * FROM products').then(result=>{
//     console.log(result[0]);
// }).catch(err=>{
//     console.log('Error during DB interaction:',err);
// });

// Using External css
app.use(express.static(path.join(__dirname,'public')));
//
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest:'images'}).single('image'));
//session
app.use(session({
    secret:'My secret to unlock',
    resave:false,
    saveUninitialized:false,
    store:store
}));

app.use(csrfProtection);
app.use(flash());

// app.use((req,res,next)=>{
//     // User.findByPk(1)
//     // .then(
//     //     user=>{
//     //     req.user = user;next();
//     // })
//     // .catch(err=>{console.log(err)});
 
//     // Mongodb
//     User.findById("638e0b580ffd1b5c834bfe4d")
//     .then(
//         user=>{
//         // req.user = user;
//         // req.user = new User(user.name,user.email,user.cart,user._id);
//         //Mongo db mongoose
//         req.user = user;
//         next();
//     })
//     .catch(err=>{console.log(err)});
// });
app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        if(!user){
            return next();
        }
        req.user = user;
        next();
    }).catch(err=>{
        console.log('while adding user:',err);
        next (new Error(err));
    })
});

app.use((req,res,next)=>{
    res.locals.isAuthenticated =  req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use('/admin',AdminRoutesData.route);
app.use(UserRoutes);
app.use(AuthRoutes);
app.use(ErrorRoutes);

//Error Handling middleware
app.use((error,req,res,next)=>{
    res.redirect('/500');
});

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
// mongoConnect(()=>{
//     app.listen(3000);
// });

// MongoDb mongoose
mongoose.connect(MONGODB_CONNECTION_URI)
.then(
    result =>
     {
        // User.findOne().then(user=>{
        //     if(!user){
        //         const user = new User({
        //             name:'suresh',
        //             email:'suresh@gmail.com',
        //             cart:{items:[]}
        //         });
        //         user.save();
        //     }
        // })
        app.listen(3000);
        console.log('server started at port 3000');
    }
)
.catch(err=>{
    console.log('Error while connecting with the Db:',err);
});