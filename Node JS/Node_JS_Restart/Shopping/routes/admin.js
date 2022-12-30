const path = require('path');
const express = require('express');
const router = express.Router();
// my import
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const {body} = require('express-validator');

// /admin/add-product -> Get
router.get('/add-product',isAuth,adminController.getAddProduct);

// /admin/add-product -> POST
router.post('/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],

isAuth,adminController.postAddProduct);

// //My try
// /admin/products
router.get('/products',isAuth,adminController.getProducts);

// /admin/edit-product/:productId
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);

router.post('/edit-product',
[
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    // body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],

isAuth,adminController.postEditProduct);

// // My try
router.post('/delete-product',isAuth,adminController.postDeleteProduct);
module.exports.route = router;