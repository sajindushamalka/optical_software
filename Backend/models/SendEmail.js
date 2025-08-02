const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinctechnology@gmail.com',
    pass: 'ewtw vtbq ovzt amrn', // Use an app password here
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'webinctechnology@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
