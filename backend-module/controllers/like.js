const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');

exports.likePost = (req, res, next) => {
    const postId = req.params.postId;
    User.findById(req.userId)
        .then(user => {
            if (!user) {
                const error = new Error('Login to like this Post');
                error.statusCode(404);
                throw error;
            }

            return Like.findOne({ postId: postId })
        })
        .then(likedPost => {
            if (!likedPost) {
                // Create a new like document if none exists (i.e. No likes yet)
                likedPost = new Like({
                    postId: postId,
                    users: [req.userId]
                });
            } else {

                likedPost.users.push(req.userId);
            }

            return likedPost.save();
        })
        .then(result => {
            res.status(200).json({ message: `post: ${result.postId} is liked`, totalLikes: result.users.length });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getPostLikes = (req, res, next) => {
    const postId = req.params.postId;
    Like.findOne({ postId: postId })
        .populate('users')
        .then(likedPost => {
            let totalLikes = 0;
            console.log("Users: ", likedPost.users);
            if (likedPost) {
                totalLikes = likedPost.users.length;
            }

            res.status(200).json({ likes: totalLikes, users: likedPost.users.map(user => user.email) });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.unlikePost = (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    Like.findOne({ postId: postId })
        .populate('users')
        .then(likedPost => {
            if (likedPost.users && likedPost.users.length > 0) {
                likedPost.users = likedPost.users.filter(user => user._id.toString() !== userId);
                return likedPost.save();
            }
        })
        .then(result => {
            if (result) {
                res.status(200).json({ message: `User ${userId} unlike the Post ${postId}` });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}