const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');

router.put('/signup', [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters long.'),
    body('email')
        .isEmail()
        .withMessage('please enter a valid email address')
        .normalizeEmail()
        .custom(value => {
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail already exists!!');
                    };
                })
        }),

    body('password')
        .isLength({ min: 5 })
        .trim(),
], authController.signup);

router.post('/login', authController.login);

router.get('/check-token', isAuth, authController.checkToken);

module.exports = router;
