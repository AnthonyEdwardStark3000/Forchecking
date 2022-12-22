const crypto = require('crypto');

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const transport = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key: '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',
//     }
// }));
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
const env = require('dotenv').config();
const {check, validationResult} = require('express-validator');

const transport = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth:{
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
    }
});

exports.getLogin = (req,res,next)=>{
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim();
    console.log('session Details:',req.session.isLoggedIn);
    let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/login',{
        path:'/login',
        title:"Login",
        errorMessage: message,
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
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('auth/login',{
        path:'/login',
        title:"Login",
        errorMessage: errors.array()[0].msg,
        });
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            req.flash('error','Invalid email or password.');
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
    console.log('session Details:',req.session.isLoggedIn);
    let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/signup',{
        path:'signup',
        title:'SignUp',
        errorMessage: message
    });
};

exports.postSignup = (req,res,next)=>{
    console.log('signing up user');
    const email = req.body.email;
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render('auth/signup',{
            path:'signup',
            title:'signup',
            errorMessage: errors.array()[0].msg,
        })
    }
    // User.findOne({email:email})
    // .then(userDoc=>{
    //     if(userDoc){
    //         req.flash('error','The entered email already exists!');
    //         return res.redirect('/signup');
    //     }
        // return 
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({
            email:email,
            password: hashedPassword,
            cart:{items:[]}
        });
        return user.save();
    })
    .then(result=>{
        res.redirect('/login');
        console.log('email will be sent to:',email);
        const msg = {
            to:email,
            from: process.env.USER_MAIL,
            subject:'Sign-Up succeeded',
            html:'<h1>Your account has been Successfully created</h1>'
        };
        // return sgMail.send(msg);
        return transport.sendMail(msg);
    }).then(result=>{
        console.log('sent the mail',result);
    }
).catch(err=>{
        console.log('error while sending mail /create account:',err);
    // });
})
.catch(err=>{
        console.log('error while signup user:',err);
    });
};

exports.getReset = (req,res,next)=>{
    let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/reset',{
        path:'reset',
        title:'Reset Password',
        errorMessage: message
    });
}

exports.postReset = (req,res,next)=>{
    crypto.randomBytes(3,(err,buffer)=>{
        if(err){
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email}).then(
            user=>{
                if(!user){
                    req.flash('error','No account with the entered email found.');
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now()+3600000;
                return user.save();
            }
        ).then(result=>{
            res.redirect('/');
        //     transport.sendMail({
        //     to: req.body.email,
        //     from:'developmentapplication01@gmail.com',
        //     subject:'Password Reset',
        //     html:`<h1> click the link to <a href="http://localhost:3000/reset/${token}">reset</a> the password,<br> link expires in 60 mins</h1>`
        // }
        // );
        const msg = {
            to:req.body.email,
            from: process.env.USER_MAIL,
            subject:'Reset Password',
            html:`<h1> click the link to <a href="http://localhost:3000/reset/${token}">reset</a> 
            the password,<br> link expires in 60 mins</h1>`
        };
        // return sgMail.send(msg);
        return transport.sendMail(msg);
        }).then(result=>{
            console.log('reset password email:',result);
        }).catch(err=>{
            console.log('error while finding user (reset):',err);
        })
    })
}

exports.getNewPassword = (req,res,next)=>{
    const token = req.params.token;
    User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then(user=>{
         let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/new-password',{
        path:'/new-password',
        title:"Reset Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
});
    }).catch(err=>{
        console.log('User find fail:',err);
    });
}

exports.postNewPassword = (req,res,next)=>{
    const password = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    console.log('user to be changed:',userId);
    User.findOne({resetToken:passwordToken,resetTokenExpiration:{$gt:Date.now()},_id:userId})
    .then(user=>{
        resetUser = user;
        return bcrypt.hash(password,12);
    })
    .then(hashedPassword=>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(result=>{
        console.log('password changed:',result);
        res.redirect('/login');
    })
    .catch(err=>{
        console.log('error for user find:',err);
    });
}