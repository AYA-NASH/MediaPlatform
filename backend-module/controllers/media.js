
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded!' });
    }

    const mediaPaths = req.files.map(file => file.path);
    console.log("Uploaded media paths:", mediaPaths);

    const newPost = new Post({
        mediaUrls: mediaPaths
    });

    newPost.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Saving post failed.' });
        });

}