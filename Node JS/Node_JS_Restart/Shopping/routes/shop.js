const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send(`<h1>Welcome to Express JS</h1><br><form action='add-product' method='GET'><button type='submit'>Add-Product</button></form>`);
}); 

module.exports = router;