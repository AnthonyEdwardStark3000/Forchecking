const express = require('express');

const feedController = require('../controllers/feed');
const router = express.Router();


//routes
router.get('/posts',feedController.getPosts); //get-> /feed/posts
router.post('/post',feedController.createPosts); //get-> /feed/posts
module.exports = router;
