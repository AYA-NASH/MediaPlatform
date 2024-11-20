const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const upload = require('../middleware/multer');
const isAuth = require('../middleware/is-auth');

router.get('/information', isAuth, profileController.getUserInfo);

router.patch('/edit', isAuth, upload.single('profile'), profileController.updateUserProfile)

router.get('/posts', isAuth, profileController.getUserPosts);

router.get('/liked-posts', isAuth, profileController.getUserLikedPosts);



module.exports = router;
