const express = require('express');
const router = express.Router();
router.get('/',(req,res,err)=>{
    res.status(200).render('welcome.ejs',{pageTitle:'User Entry'});
});
module.exports.route = router;