const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');

const fs = require('fs');
const path = require('path');

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .populate('creator')
        .sort({ createdAt: -1 })
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

exports.createPost = async (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded!' });
    }
    const mediaPaths = req.files.map(file => file.path);

    const { title, content } = req.body;

    const newPost = new Post({
        title: title,
        mediaUrls: mediaPaths,
        content: content,
        creator: req.userId
    });

    try {
        await newPost.save();
        const user = await User.findById(req.userId);
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json({
            message: 'Post created successfully!',
            post: newPost,
            creator: { _id: user._id, name: user.name }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.editPost = async (req, res, next) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const paths = req.body.paths ? JSON.parse(req.body.paths) : [];

    const uploadedMedia = req.files ? req.files.map(file => file.path) : [];

    try {
        const post = await Post.findById(postId).populate('creator');
        if (!post) {
            const error = new Error("Post can't be found!");
            error.statusCode = 404;
            throw error;
        }

        if (post.creator._id != req.userId) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }

        if (title) post.title = title;
        if (content) post.content = content;

        if (paths.length > 0) {
            const existingMedia = post.mediaUrls;
            existingMedia.forEach((url) => {
                if (!paths.includes(url)) {
                    clearFile(url);
                }
            });

            post.mediaUrls = [...paths];
        }

        if (uploadedMedia.length > 0) {
            post.mediaUrls = [...post.mediaUrls, ...uploadedMedia];
        }

        const result = await post.save();
        res.status(200).json({ message: 'Post UPDATED', post: result });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error("Post Can't be FOUND!!!");
            error.statusCode = 404;
            throw error;
        }

        if (post.creator.toString() !== req.userId) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }

        post.mediaUrls.map(url => clearFile(url));

        await Post.findByIdAndDelete(postId);

        const user = await User.findById(req.userId);
        user.posts.pull(postId);
        await user.save();

        await Like.deleteMany({ postId: postId });

        res.status(200).json({ message: 'Deleted post.' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const clearFile = (filePath) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`File deleted: ${fullPath}`);
    } else {
        console.log(`File not found: ${fullPath}`);
    }
};