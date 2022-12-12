const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

// /admin/add-product -> Get
router.get('/add-product',isAuth,adminController.getAddProduct);

// /admin/add-product -> POST
router.post('/add-product',isAuth,adminController.postAddProduct);

// //My try
// /admin/products
router.get('/products',isAuth,adminController.getProducts);

// /admin/edit-product/:productId
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);

router.post('/edit-product',isAuth,adminController.postEditProduct);

// // My try
router.post('/delete-product',isAuth,adminController.postDeleteProduct);
module.exports.route = router;