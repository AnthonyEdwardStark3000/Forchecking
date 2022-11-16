const path = require('path');
const express = require('express');
const router = express.Router();

// my import
const rootDir = require('../util/path');
const AdminRoutesData = require('./admin');

router.get('/',(req,res,next)=>{
const products = AdminRoutesData.products; 
console.log('From shop.js handling admin.js Data', AdminRoutesData.products);
// res.sendFile(path.join(rootDir,'views','shop.html'));
// For pug 
// res.render('shop',{prods:products,title:'Shopify',path:'/'});

// For handlebar
res.render('shop',{
    prods:products,
    title:'Shopify',
    path:'/',
    hasProducts:products.length>0?true:false,
    productCss:true,
    activeShop:true,
});
}); 

module.exports = router;