const express = require('express');

const likeController = require('../controllers/like');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/:postId', isAuth, likeController.likePost);

router.get('/:postId', likeController.getPostLikes);

router.delete('/:postId', isAuth, likeController.unlikePost);

module.exports = router;