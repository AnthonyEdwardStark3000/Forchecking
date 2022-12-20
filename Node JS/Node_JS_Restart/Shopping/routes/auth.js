const express = require('express');
const {check,body} = require('express-validator/check');
const authController = require('../controllers/auth');
const router = express.Router();
router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);
router.get('/signup',authController.getSignup);
router.post('/signup',[check('email').isEmail().withMessage('Please Enter a valid Email !'),
body('password','Your password should be minimum 5 characters long')
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