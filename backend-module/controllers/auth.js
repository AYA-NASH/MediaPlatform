const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');

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

exports.checkToken = async (req, res, next) => {
    return res.status(200).json({ valid: true });
}