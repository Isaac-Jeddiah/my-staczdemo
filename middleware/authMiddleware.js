const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }
};