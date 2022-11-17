const express = require('express');
const router = express.Router();

router.use((req,res,err)=>{
    res.status(404).render('page-not-found.ejs',{pageTitle:'Not Found !'});
});

module.exports.route = router;