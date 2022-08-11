const express = require('express');
const app = express();
const router = express.Router();

router.get('/', function(req, res,next){
    res.status(200).render('index',{pageTitle:'TamilBlasters',Title:'Welcome to TamilBlasters', activeLink: 'main'});
});

router.get('/movie', function(req, res,next){
    res.render();
});

module.exports = router;

