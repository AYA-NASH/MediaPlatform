const User = require('../models/user');
const Like = require('../models/like');

exports.likePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("Un-Autherized operation");
            error.statusCode = 404;
            throw error;
        }

        const isLikeExist = await Like.findOne({ postId: postId, userId: userId });
        if (isLikeExist) {
            return res.status(409).json({ message: 'User already likes this post' });
        }

        const like = new Like({
            postId: postId,
            user: userId
        });

        const result = await like.save();
        res.status(200).json({ message: 'post liked', result: result });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getPostLikes = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const likes = await Like.find({ postId: postId }).populate('user');
        if (likes.length === 0) {
            return res.status(200).json({ message: 'No likes on this post', likes: 0, users: [] });
        }

        const users = likes.map(likeDoc => likeDoc.user ? likeDoc.user.name : null);

        return res.status(200).json({ message: 'likes fetched', likes: likes.length, users: users });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.unlikePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.userId;
    try {
        const likeDoc = await Like.findOneAndDelete({ postId: postId, user: userId });
        if (!likeDoc) {
            return res.status(404).json({ message: "Like not found" });
        }
        res.status(200).json({ message: "post unliked" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}