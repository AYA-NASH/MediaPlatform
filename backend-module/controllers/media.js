
const Post = require('../models/post');

exports.getAllPosts = (req, res, next) => {
    Post.find().populate('creator')
        .then(posts => {
            res.status(200).json({
                message: 'Posts Fetched Successfully',
                posts: posts
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Post Can't be FOUND!!!");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.createPost = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded!' });
    }

    const mediaPaths = req.files.map(file => file.path);
    console.log("Uploaded media paths:", mediaPaths);

    const title = req.body.title;
    const content = req.body.content;

    const newPost = new Post({
        title: title,
        mediaUrls: mediaPaths,
        content: content,
        creator: req.userId
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

exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;

    let mediaUrls = req.files;
    if (req.files && req.files.length > 0) {
        mediaUrls = req.files.map(file => file.path);
    }

    Post.findById(postId)
        .populate('creator')
        .then(post => {
            if (!post) {
                const error = new Error("Post Can't be FOUND!!!");
                error.statusCode = 404;
                throw error;
            }
            if (post.creator._id.toString() !== req.userId) {
                const error = new Error('Not authorized');
                error.statusCode = 403;
                throw error;
            }

            if (title) post.title = title;
            if (content) post.content = content;
            if (mediaUrls) post.mediaUrls = mediaUrls;

            return post.save();
        })
        .then(updatedPost => {
            res.status(200).json({ message: 'Post UPDATED', post: updatedPost })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByIdAndDelete(postId)
        .then(result => {
            res.status(200).json({ message: 'Post Deleted', result: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}