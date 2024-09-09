const express = require('express');
const app = express();

// Middleware to check cookie authorization
function checkCookieAuth(req, res, next) {
    const authCookie = req.cookies.authToken; // Replace 'authToken' with your cookie name

    if (!authCookie) {
        return res.status(401).json({ message: 'Unauthorized: No cookie provided' });
    }

    // Here, you could add more logic to verify the cookie's validity, e.g., JWT verification.
    // If valid, proceed to the next middleware or route handler.
    try {
        // Validate the token (example for JWT)
        // const decoded = jwt.verify(authCookie, 'your_secret_key');
        // req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden: Invalid cookie' });
    }
}

exports.checkCookieAuth;