const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

// // /admin/add-product -> Get
// router.get('/add-product',adminController.getAddProduct);

// // /admin/add-product -> POST
// router.post('/add-product',adminController.postAddProduct);

// //My try
// // /admin/products
// router.get('/products',adminController.getProducts);

// // /admin/edit-product/:productId
// router.get('/edit-product/:productId',adminController.getEditProduct);

// router.post('/edit-product',adminController.postEditProduct);

// // // My try
// router.post('/delete-product',adminController.postDeleteProduct);
module.exports.route = router;