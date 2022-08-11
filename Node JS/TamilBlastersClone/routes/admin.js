const express = require('express');
const app = express();
const router = express.Router();

router.get('/add-movie', function(req, res, next){
    res.status(200).render('admin',{pageTitle:'AdminPage', activeLink: 'add-movie'});
});
router.post('/add-movie', function(req, res,next){
    res.status(200).render('/');
});


module.exports = router;

