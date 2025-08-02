const jwt = require('jsonwebtoken');
const JWT_SECRET = "ewkchapcnpity31bhdb87cbakgckla8chugqbhkjhk"; // same key

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: 'Access Token Required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });

        req.user = user; // attach user info to request
        next();
    });
};

module.exports = authenticateToken;
