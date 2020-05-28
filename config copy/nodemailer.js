const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: { "user": "your@gmail.com", "pass": "whatever" }
});

module.exports = transporter;