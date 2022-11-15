const express = require('express');
const path = require('path');
const router = express.Router();
//
const rootDir = require('../util/path');
router.post('/add-user',(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootDir,'views','new-user.html'));
});
module.exports = router;