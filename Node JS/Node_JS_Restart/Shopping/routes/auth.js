const express = require('express');
const {check,body} = require('express-validator');
const authController = require('../controllers/auth');
const router = express.Router();
const User = require('../models/user');

router.get('/login',authController.getLogin);
router.post('/login',[check('email').isEmail().withMessage('Please Enter a valid Email Address !'),
body('password','Your password Should be minimum 5 characters long and maximum 16 characters').isLength({min:5,max:16})
.isAlphanumeric()],authController.postLogin);
router.post('/logout',authController.postLogout);
router.get('/signup',authController.getSignup);
router.post('/signup',[check('email').isEmail().withMessage('Please Enter a valid Email !')
.custom((value,{req})=>{
    return User.findOne({email:value})
    .then(userDoc=>{
        if(userDoc){
            return Promise.reject('The entered email already exists!');
        }
    });
}),
body('password','Your password should be minimum 5 characters long and maximum 16 characters')
.isLength({min:5,max:12})
.isAlphanumeric(),
body('confirmPassword').custom((value,{req})=>{
    if(value!=req.body.password){
       throw new Error("Your passwords doesn't match")
    }
    return true;
})
],authController.postSignup);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);
module.exports = router;