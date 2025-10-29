const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../model/adminModel');
const { getMessages } = require('../controller/adminController');
const { verifyToken } = require('../middleware/authMiddleware');

// Admin login route
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
});

// Get all messages (protected)
router.get('/messages', getMessages);

module.exports = router;