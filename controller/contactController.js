//contact controller without validation
const Message = require('../model/messageModel');
const mongoose = require('mongoose');
// Create a new message
exports.createMessage = async (req, res, next) => {
    try {
        const { name, email,phone, message } = req.body;
        const newMessage = new Message({ name, email, phone, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully.' });
    }
    catch (err) {
        next(err);
    }
};

