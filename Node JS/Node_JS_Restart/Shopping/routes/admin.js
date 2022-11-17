const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const productsController = require('../controllers/products');

// /admin/add-product -> Get
router.get('/add-product',productsController.getAddProduct);

// /admin/add-product -> POST
router.post('/add-product',productsController.postAddProduct);

module.exports.route = router;