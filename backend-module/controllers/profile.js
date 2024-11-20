const fs = require('fs');
const path = require('path')

const User = require('../models/user');
const Like = require('../models/like');
const Post = require('../models/post');

exports.getUserInfo = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId, 'name email profilePicture status');
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "User Information Fetched",
            profile: {
                name: user.name,
                email: user.email,
                status: user.status,
                profilePicture: user.profilePicture
            }
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    }
}

exports.updateUserProfile = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);

        const { name, email, status } = req.body;
        const existingUser = await User.find({
            email: email,
            _id: { $ne: userId }
        });
        if (existingUser.length > 0) {
            return res.status(401).json({ message: "There is a user with this email" });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (status) user.status = status;

        if (req.file) {
            if (user.profilePicture) {
                clearFile(user.profilePicture)
            }
            user.profilePicture = req.file.path;
        }
        const result = await user.save();
        res.status(200).json({
            messgae: "User's profile updated", profile: {
                name: result.name,
                email: result.email,
                status: result.status,
                profilePicture: result.profilePicture
            }
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const clearFile = (filePath) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    } else {
        console.log(`File not found: ${fullPath}`);
    }
};

exports.getUserPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 2;

    const userId = req.userId;
    try {
        const totalPosts = await Post.countDocuments({ creator: userId });
        const posts = await Post.find({ creator: userId })
            .sort({ creaedAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select('title createdAt');

        res.status(200).json({
            posts: {
                items: posts,
                totalItems: totalPosts,
                currentPage: page,
                totalPages: Math.ceil(totalPosts / perPage)
            }
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserLikedPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 2;
    const userId = req.userId;
    try {
        const totalLikedPosts = await Like.countDocuments({ user: userId });
        const likedPosts = await Like.find({ user: userId })
            .sort({ creaedAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('postId', 'title')
            .populate('user', 'name');


        res.status(200).json({
            likedPosts: {
                items: likedPosts.map(p => {
                    return { title: p.postId.title, creator: p.user.name, createdAt: p.createdAt }
                }),
                totalItems: totalLikedPosts,
                currentPage: page,
                totalPages: Math.ceil(totalLikedPosts / perPage),
            }
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};