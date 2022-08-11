const path = require('path');
const express = require('express');
const router = express.Router();

const rootFolder = require('../util/path');
const adminData = require('./admin');

router.get('/',function(req, res, next){
    console.log(__dirname+" "+adminData.products);
    console.log("Base Page");
    // res.status(200).sendFile(path.join(rootFolder,'views','shop.html'));
    const products = adminData.products;
    res.status(200).render('shop',{prod: products, docTitle: 'My Shop', path:'/', pageTitle:'Shop', hasProducts: products.length>0 ?true : false , activeShop: true, productCSS:true});
});

module.exports = router;