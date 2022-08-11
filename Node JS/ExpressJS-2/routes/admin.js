const path = require('path');
const express = require('express');
const router = express.Router();

const rootFolder = require('../util/path');

const  products = [];

router.get('/add-product',function(req, res, next){
    console.log("In middleware");
    // res.status(200).sendFile(path.join(rootFolder, 'views', 'add-product.html'));
    res.status(200).render('add-product' ,{pageTitle: "Add Product", path: "/admin/add-product",productCSS: true, activeAddProduct: true});
});

router.post('/add-product',function(req, res, next){
    console.log(req.body);
    products.push({title: req.body.title})
    res.status(200).redirect('/');
});

exports.routes = router;
exports.products = products;