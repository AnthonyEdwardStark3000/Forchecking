const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const products = [];
// /admin/add-product -> Get
router.get('/add-product',(req,res,next)=>{
// res.sendFile(path.join(rootDir,'views','add-product.html'));
// For pug
// res.status(200).render('add-product',{title:'Add Product',path:'/admin/add-product'});

// For handlebar
res.status(200).render('add-product',{title:'Add Product',path:'/admin/add-product',productCss:true,activeAddProduct:true});
});

// /admin/add-product -> POST
router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect('/');
});

module.exports.route = router;
module.exports.products = products;