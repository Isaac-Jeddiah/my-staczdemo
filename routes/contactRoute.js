const express = require('express');
const router = express.Router();
const { createMessage } = require('../controller/contactController');

router.post('/', createMessage);

module.exports = router;