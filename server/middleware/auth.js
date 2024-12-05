const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        console.log('No token provided in request');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Use JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token verified for user:', decoded.user.id);
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};