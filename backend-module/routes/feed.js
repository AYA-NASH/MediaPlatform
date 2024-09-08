const express = require('express');
const router = express.Router();

const images = [];

router.post('/post', (req, res, next) => {
    const image = req.body.imagePath;
    images.push(image)

    console.log("Image reached the backend side!!!", image);
    res.status(201).json({
        message: 'Post created successfully!',
        post: image
    });
})

module.exports = router;

