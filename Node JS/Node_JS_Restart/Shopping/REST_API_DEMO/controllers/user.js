const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup =(req,res,next)=>{
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password,12).then(hashedPw=>{
        const user = new User({
            name: name,
            email: email,
            password: hashedPw,
        });
        return user.save();
    }).then(result=>{
        console.log('user data created!',result);
        res.status(201).json({message:'User data created',userId: result._id});
    }).catch(err=>{
        console.log('error while hashing the password');
        if(!err){
            res.statusCode = 500;
        }
        next(err);
    });
}