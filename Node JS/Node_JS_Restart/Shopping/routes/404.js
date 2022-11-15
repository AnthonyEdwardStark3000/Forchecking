const express = require('express');
const path = require('path');
const router = express.Router();

// my import
const rootDir = require('../util/path');

router.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','page-not-found.html'));
});

module.exports = router;