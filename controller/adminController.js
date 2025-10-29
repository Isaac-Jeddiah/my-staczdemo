//admin controller
const Message = require('../model/messageModel');
const Admin = require('../model/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
// Admin login
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '6d' });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

// Get all messages
exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (err) {
        next(err);
    }
};
