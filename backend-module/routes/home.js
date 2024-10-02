const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/media')
const upload = require('../middleware/multer')
const isAuth = require('../middleware/is-auth');

router.get('/', mediaController.getAllPosts);

router.get('/post/:postId', mediaController.getPost);

router.put('/post/:postId', isAuth, upload.array('files', 10), mediaController.editPost);

router.post('/post', isAuth, upload.array('files', 10), mediaController.createPost);

router.delete('/post/:postId', isAuth, mediaController.deletePost);

module.exports = router;