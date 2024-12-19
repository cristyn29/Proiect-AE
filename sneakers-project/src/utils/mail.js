const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendConfirmationEmail(to, subject, text) {
  const info = await transporter.sendMail({
    from: '"Sneakers Shop" <no-reply@sneakers.com>',
    to,
    subject,
    text
  });
  console.log('Email trimis:', info.messageId);
  return info;
}

module.exports = {
  sendConfirmationEmail
};
