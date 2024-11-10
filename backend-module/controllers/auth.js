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

        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    }

    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
          const error = new Error('User not found.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ status: user.status });
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    }    
};

exports.updateUserStatus = async (req, res, next) => {
    const userStatus = req.body.status;
    try{
        const user = await User.findById(req.userId);
        if(!user){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        user.status = newStatus;
        await user.save();
        res.status(200).json({ message: 'User updated.' });
    }  
    catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    }
};