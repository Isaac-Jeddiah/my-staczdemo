//create seeder file to create a dummy admin with username: admin and password: password123
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./model/adminModel');
require('dotenv').config();
const connectDb = require('./db');
const seedAdmin = async () => {
    try {
        await connectDb();
        const existingAdmin = await Admin.findOne({ username: 'staczvision' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash('healthcare', 10);
        const admin = new Admin({
            username: 'staczvision',
            password: hashedPassword,
        });
        await admin.save();
        console.log('Admin user created with username: staczvision and password: healthcare');
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin user:', err);
        process.exit(1);
    }
};
seedAdmin();