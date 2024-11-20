const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("UnAutherized Request");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'mySecretToken');
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            const error = new Error('Unauthorized Request: Token Expired');
            error.statusCode = 401;
            throw error;
        }

        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Unauthorized Request: Invalid Token');
        error.statusCode = 401;
        throw error;
    }


    req.userId = decodedToken.userId;
    next();

}