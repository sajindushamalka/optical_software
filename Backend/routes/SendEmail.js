// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { notifyUser } = require('../controllers/SendEMail.js');

router.post('/notify', notifyUser);

module.exports = router;
