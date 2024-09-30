const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 12)
        .then(hashedP => {
            const newUser = new User({
                email: email,
                password: hashedP
            });

            return newUser.save();
        }).then(result => {
            res.status(201).json({ message: 'New User added!', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            loadedUser = user;
            const password = req.body.password;
            return bcrypt.compare(password, user.password);
        })
        .then(equalP => {
            if (!equalP) {
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

            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};