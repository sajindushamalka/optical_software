const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController.js');

const multer = require('multer');
const upload = multer({ dest: './uploads/' }); // temp

// Upload PDF and send it
router.post('/send-pdf', upload.single('pdf'), whatsappController.uploadAndSendPDF);

module.exports = router;
