const path = require('path');
const express = require('express');
const router = express.Router();

// my import
const rootDir = require('../util/path');
// const AdminRoutesData = require('./admin');

const productsController = require('../controllers/products');

router.get('/',productsController.getProducts); 
router.get('/products',productsController.getIndexProducts); 
router.get('/cart',productsController.getCartProducts); 

module.exports = router;