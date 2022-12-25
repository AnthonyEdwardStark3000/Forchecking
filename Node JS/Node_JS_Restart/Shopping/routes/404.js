const express = require('express');
// const path = require('path');
const router = express.Router();

// my import
const rootDir = require('../util/path');
const errorController = require('../controllers/error');
router.get('/500',errorController.error500);
router.use(errorController.error404);

module.exports = router;