const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Like = require('../models/like');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { name, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 12);
    try {
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPass
        });

        const result = await newUser.save();

        res.status(201).json({ message: 'New User added!', userId: result._id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let loadedUser = await User.findOne({ email: email });

        if (!loadedUser) {
            const error = new Error("email doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        const passIsEqual = await bcrypt.compare(password, loadedUser.password);

        if (!passIsEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
            'mySecretToken',
            { expiresIn: '1h' });

        res.status(200).json({ token: token, userId: loadedUser._id.toString(), username: loadedUser.name });
    }

    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserProfile = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).populate('posts', 'title createdAt');
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        const { name, email, profilePicture, status, posts, createdAt } = user;

        const likedPosts = await Like.find({ user: userId })
            .populate('postId', 'title')
            .populate('user', 'name');

        res.status(200).json({
            profile: {
                name,
                email,
                profilePicture,
                status,
                posts,
                createdAt,
                likedPosts
            }

        });
    } catch (err) {
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
        console.log('existingUser: ', existingUser)
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
        res.status(200).json({ messgae: "User's profile updated", result: result })
    }
    catch (err) {

    }
};

const clearFile = (filePath) => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    } else {
        console.log(`File not found: ${fullPath}`);
    }
}