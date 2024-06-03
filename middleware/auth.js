const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    console.log(req.headers.authorization?.split(' ')[1])
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decodedToken.userId;
        next();
    });
};