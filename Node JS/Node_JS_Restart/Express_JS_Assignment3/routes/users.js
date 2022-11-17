const express = require('express');
const router = express.Router();
const users = [];
router.get('/add-user',(req,res,err)=>{
    res.render('userData',{users,pageTitle:'Add user'});
});
router.post('/add-user',(req,res,err)=>{
    users.push({userName:req.body.userData});
    console.log('Inside creating new user.',req.body.userData);
    console.log(users);
    res.redirect('/');
});
module.exports.route = router;