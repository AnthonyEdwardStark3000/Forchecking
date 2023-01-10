const {validationResult} = require('express-validator');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            const error = new Error('No matching user found for the entered Email Id');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual){
            const error = new Error('Invalid user ID or password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
        );
        res.status(200).json({message:'User authentication success',token:token,userId:loadedUser._id.toString()});
    })
    .catch(err=>{
         if(!err.statusCode){
            res.statusCode = 500;
        }
        next(err);
    });
}

exports.getUserStatus = (req,res,next)=>{
    User.findById(req.userId)
    .then(
        user=>{
            if(!user){
                const error = new Error('User not Found!');
                error.statusCode =404;
                throw error;
            }
            res.status(200).json({status: user.status})
        }
    )
    .catch(err=>{
        console.log('while getting the status:',err);
        if(!err.statusCode){
            res.statusCode = 500;
        }
        next(err);
    })
}

exports.updateUserStatus = (req,res,next)=>{
    const newStatus = req.body.status;
    User.findById(req.userId).then(
        user=>{
            if(!user){
                const error = new Error('User not Found!');
                error.statusCode =404;
                throw error;
            }
            user.status = newStatus;
            return user.save();
        })
        .then(result=>{
            res.status(200).json({message:'User Updated Successfully'})
        })
        .catch(err=>{
        console.log('while updating the status:',err);
         if(!err.statusCode){
            res.statusCode = 500;
        }
        next(err);
    });
}