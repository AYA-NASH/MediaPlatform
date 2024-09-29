
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded!' });
    }

    const images = req.files.map((f) => f.path);

    const newPost = new Post({
        imageUrls: images
    });

    newPost.save().then(r => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: images
        });
    });

}