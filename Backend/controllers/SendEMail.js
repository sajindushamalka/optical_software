// controllers/emailController.js
const { sendEmail } = require('../models/SendEmail.js');

const notifyUser = async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await sendEmail(to, subject, message);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

module.exports = { notifyUser };
