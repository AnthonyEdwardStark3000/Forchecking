const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
    // User.findById("638e0b580ffd1b5c834bfe4d")
    // .then(
    //     user=>{
    //     req.session.isLoggedIn = true;
    //     req.session.user = user;
    //     req.session.save(err=>{
    //         console.log('error while saving the session:',err);
    //         res.redirect('/');
    //     });
    // })
    // .catch(err=>{console.log(err)});
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.redirect('/login');
        }
        bcrypt.compare(password,user.password).then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err=>{
                console.log('error while saving user:',err);
                res.redirect('/');
                });
            }
            return res.redirect('/login');
        }).catch(err=>{
            console.log('error while comparing hashed password:',err);
            res.redirect('/login');
        });
    })
    .catch(err=>{
        console.log('error while checking user login:',err);
    });
};

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log('Clearing the session:',err);
        res.redirect('/');
    });
};

exports.getSignup = (req,res,next)=>{
    res.render('auth/signup',{
        path:'signup',
        title:'SignUp',
        isAuthenticated:false
    });
};

exports.postSignup = (req,res,next)=>{
    console.log('signing up user');
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email:email}).then(userDoc=>{
        if(userDoc){
            return res.redirect('/signup');
        }
        return bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({
            email:email,
            password: hashedPassword,
            cart:{items:[]}
        });
        return user.save();
    });
    })
    .then(result=>{
        res.redirect('/login');
    }).catch(err=>{
        console.log('error while signup user:',err);
    });
};