const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const router = express.Router();


//routes
router.get('/posts',feedController.getPosts); //get-> /feed/posts
router.post('/post',[body('title').trim().isLength({min:5}),body('content').trim().isLength({min:5})],feedController.createPost); //get-> /feed/posts
router.get('/post/:postId',feedController.getPost);

module.exports = router;
