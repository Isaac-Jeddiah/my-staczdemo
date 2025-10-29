const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contactRoute');
const adminRoute = require('./routes/adminRoute');
const connectDb = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

//configure cors
app.use(cors({
  origin: [ process.env.FRONTEND_URI ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

// Connection to the database
try {
    connectDb();
} catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
}

app.use('/api/contact', contactRoute);
app.use('/api/admin', adminRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));