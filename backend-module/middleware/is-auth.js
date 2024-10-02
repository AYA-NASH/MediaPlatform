const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("Autherization Middleware");
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("UnAutherized Request");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        // Verify and decode the token
        decodedToken = jwt.verify(token, 'mySecretToken');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    // Check if token is invalid or missing
    if (!decodedToken) {
        const error = new Error('Unauthorized Request: Invalid Token');
        error.statusCode = 401;
        throw error;
    }


    req.userId = decodedToken.userId;
    console.log('Autherized Request!!')
    next();

}