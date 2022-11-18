const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

// /admin/add-product -> Get
router.get('/add-product',adminController.getAddProduct);

// /admin/add-product -> POST
router.post('/add-product',adminController.postAddProduct);

//My try
// /admin/products
router.get('/products',adminController.getProducts);

module.exports.route = router;