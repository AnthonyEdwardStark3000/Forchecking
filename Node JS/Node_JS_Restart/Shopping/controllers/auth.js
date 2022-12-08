const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim();
    console.log('session Details:',req.session.isLoggedIn);
    res.render('auth/login',{path:'/login',title:"Login",
    isAuthenticated: false
});
};

exports.postLogin = (req,res,next)=>{
    //setting up cookie
    // res.setHeader("Set-Cookie","loggedIn=true;HttpOnly");
    //setting up session instead of cookie
    User.findById("638e0b580ffd1b5c834bfe4d")
    .then(
        user=>{
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err=>{console.log(err)});
};

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log('Clearing the session:',err);
        res.redirect('/');
    });
};