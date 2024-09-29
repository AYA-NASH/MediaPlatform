const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/media')
const upload = require('../middleware/multer')

router.post('/post', upload.array('files', 10), mediaController.createPost);

module.exports = router;

